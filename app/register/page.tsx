'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock, User, Phone, Ticket, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { validateEmail, validatePassword, generateInvitationCode } from '@/lib/utils'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    invitationCode: 'WZNBWUPC', // Default demo code
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    acceptTerms: false,
    marketingConsent: false,
  })
  
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
    
    setError('')
    setSuccess('')
    
    // Validate password in real-time
    if (name === 'password') {
      const validation = validatePassword(value)
      setPasswordErrors(validation.errors)
    }
    
    // Clear password errors if passwords match
    if (name === 'confirmPassword' && value === formData.password) {
      setPasswordErrors([])
    }
  }
  
  const handleGenerateCode = () => {
    const newCode = generateInvitationCode()
    setFormData(prev => ({ ...prev, invitationCode: newCode }))
    setSuccess(`Generated new invitation code: ${newCode}`)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validation
    const requiredFields = ['invitationCode', 'email', 'password', 'confirmPassword', 'firstName', 'lastName']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(', ')}`)
      return
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setPasswordErrors(passwordValidation.errors)
      setError('Please fix password errors')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (!formData.acceptTerms) {
      setError('You must accept the Terms of Service to continue')
      return
    }
    
    setIsLoading(true)
    
    try {
      // In a real app, this would call the API
      // const response = await authApi.register(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful registration
      localStorage.setItem('accessToken', 'mock_access_token_new_user')
      localStorage.setItem('refreshToken', 'mock_refresh_token_new_user')
      localStorage.setItem('user', JSON.stringify({
        id: 'usr_new_456',
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        tier: 'bronze',
        invitationCodeUsed: formData.invitationCode
      }))
      
      setSuccess('Registration successful! Welcome to SHEIN-VIP.')
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
      
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg" />
            <span className="text-2xl font-bold text-gray-900">
              SHEIN<span className="text-purple-600">-VIP</span>
            </span>
          </div>
          <p className="text-gray-600">Join our exclusive VIP shopping community</p>
        </div>
        
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create VIP Account</CardTitle>
            <CardDescription className="text-center">
              Enter your invitation code and personal details to get started
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">{success}</span>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              {/* Demo Note */}
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
                <p className="text-sm font-medium">Demo Information:</p>
                <p className="text-sm">Use invitation code: <strong>WZNBWUPC</strong></p>
                <p className="text-sm">Or click "Generate Demo Code" for a new one</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Invitation Code */}
                  <div className="space-y-2">
                    <Label htmlFor="invitationCode">Invitation Code *</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="invitationCode"
                          name="invitationCode"
                          placeholder="Enter invitation code"
                          className="pl-10"
                          value={formData.invitationCode}
                          onChange={handleChange}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleGenerateCode}
                        disabled={isLoading}
                      >
                        Generate Demo Code
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      You need an invitation code from an existing member to join
                    </p>
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Password Requirements */}
                    {passwordErrors.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {passwordErrors.map((error, index) => (
                          <p key={index} className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm font-normal">
                        I agree to the{' '}
                        <Link href="/terms" className="text-purple-600 hover:underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-purple-600 hover:underline">
                          Privacy Policy
                        </Link>
                        {' '}*
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <Label htmlFor="marketingConsent" className="text-sm font-normal">
                        I want to receive marketing promotions and updates via email
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* VIP Benefits Preview */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">VIP Benefits You&apos;ll Get:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Exclusive member pricing on all products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Faster shipping and priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Invitation codes to share with friends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Progress through Bronze, Silver, and Gold tiers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                isLoading={isLoading}
              >
                Create VIP Account
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        {/* Security Assurance */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your information is secured with bank-level encryption. We never share your personal data.
          </p>
        </div>
      </div>
    </div>
  )
}
