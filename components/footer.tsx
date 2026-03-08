import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const footerLinks = {
  Shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Best Sellers', href: '/products?filter=bestsellers' },
    { name: 'VIP Exclusive', href: '/vip' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  Support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  Connect: [
    { name: 'Facebook', href: 'https://facebook.com', icon: <Facebook className="h-4 w-4" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="h-4 w-4" /> },
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="h-4 w-4" /> },
    { name: 'YouTube', href: 'https://youtube.com', icon: <Youtube className="h-4 w-4" /> },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              Public Portal
            </Link>
            <p className="text-gray-400 mt-4 max-w-md">
              Your one-stop destination for premium products and exclusive VIP benefits. 
              Join thousands of satisfied customers worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {footerLinks.Connect.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            category !== 'Connect' && (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Public Portal. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by the Public Portal team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}