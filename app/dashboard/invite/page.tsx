'use client';

import { useState } from 'react';
import { Copy, Share2, Users, Mail, MessageSquare, Facebook, Twitter, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function InvitePage() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const referralCode = 'VDAX9-2026';
  const referralLink = `https://platform.example.com/register?ref=${referralCode}`;
  const userTier = 'Gold';
  const commissionRate = 15;
  const totalEarnings = 1250;
  const friendsInvited = 8;
  const activeFriends = 5;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (!email.trim()) return;
    
    // Simulate sending invite
    alert(`Invite sent to ${email}`);
    setEmail('');
    setMessage('');
  };

  const shareOptions = [
    { icon: <MessageSquare className="h-5 w-5" />, label: 'WhatsApp', color: 'bg-green-500' },
    { icon: <Facebook className="h-5 w-5" />, label: 'Facebook', color: 'bg-blue-600' },
    { icon: <Twitter className="h-5 w-5" />, label: 'Twitter', color: 'bg-blue-400' },
    { icon: <Mail className="h-5 w-5" />, label: 'Email', color: 'bg-red-500' },
  ];

  const commissionTiers = [
    { tier: 'Bronze', rate: '5%', minFriends: 0, color: 'bg-amber-700' },
    { tier: 'Silver', rate: '10%', minFriends: 3, color: 'bg-gray-400' },
    { tier: 'Gold', rate: '15%', minFriends: 8, color: 'bg-yellow-500' },
    { tier: 'Platinum', rate: '20%', minFriends: 15, color: 'bg-purple-600' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Invite Friends</h1>
          <p className="text-gray-600">
            Invite friends and earn commission on their purchases. The more friends you invite, the higher your tier!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Link */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Your Tier</p>
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-2xl font-bold">{userTier}</h3>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          {commissionRate}% Commission
                        </Badge>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <h3 className="text-2xl font-bold mt-1">${totalEarnings.toLocaleString()}</h3>
                    </div>
                    <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <span className="font-bold">$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Friends Invited</p>
                      <h3 className="text-2xl font-bold mt-1">{friendsInvited}</h3>
                      <p className="text-sm text-green-600 mt-1">{activeFriends} active</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Your Referral Link
                </CardTitle>
                <CardDescription>
                  Share this link with friends to start earning commission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant={copied ? "default" : "outline"}
                      className={copied ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Your Referral Code</p>
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                      <code className="font-mono font-bold text-lg">{referralCode}</code>
                      <Badge variant="secondary">Copy & Share</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commission Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Commission Tiers</CardTitle>
                <CardDescription>
                  Earn more as you invite more friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionTiers.map((tier) => (
                    <div
                      key={tier.tier}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        tier.tier === userTier
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full ${tier.color} flex items-center justify-center text-white font-bold`}>
                          {tier.tier.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{tier.tier}</h4>
                          <p className="text-sm text-gray-600">
                            {tier.minFriends === 0 ? 'Starting tier' : `Requires ${tier.minFriends}+ friends`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{tier.rate}</div>
                        <div className="text-sm text-gray-600">commission</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Invite Form & Quick Share */}
          <div className="space-y-6">
            {/* Invite by Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Invite by Email
                </CardTitle>
                <CardDescription>
                  Send personalized invites to friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Friend's Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="friend@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full min-h-[100px] p-3 border rounded-lg"
                      placeholder="Hey! Join me on this awesome platform and we both get benefits..."
                    />
                  </div>
                  <Button onClick={handleSendInvite} className="w-full">
                    Send Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Share */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Quick Share
                </CardTitle>
                <CardDescription>
                  Share instantly on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {shareOptions.map((option) => (
                    <button
                      key={option.label}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border hover:shadow-md transition-shadow ${option.color} text-white`}
                      onClick={() => alert(`Sharing to ${option.label}`)}
                    >
                      {option.icon}
                      <span className="mt-2 font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Share Your Link</div>
                      <div className="text-sm text-gray-600">
                        Copy your unique referral link or code
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-medium">Friend Registers</div>
                      <div className="text-sm text-gray-600">
                        Friend registers using your code and makes purchases
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Earn Commission</div>
                      <div className="text-sm text-gray-600">
                        Earn commission based on your tier and their spending
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}