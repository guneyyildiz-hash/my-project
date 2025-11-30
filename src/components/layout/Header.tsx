'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './Container';

const navLinks = [
  { href: '/', label: 'Home' },
  { 
    href: '/work/articles', 
    label: 'Work',
    children: [
      { href: '/work/articles', label: 'All Articles' },
      { href: '/work/forbes', label: 'Forbes' },
      { href: '/work/bbc', label: 'BBC' },
      { href: '/work/videos', label: 'Videos' },
    ]
  },
  { href: '/about', label: 'About' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading font-bold text-xl text-navy">Guney Yildiz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.children ? (
                <div 
                  key={link.href} 
                  className="relative"
                  onMouseEnter={() => setWorkDropdownOpen(true)}
                  onMouseLeave={() => setWorkDropdownOpen(false)}
                >
                  <button className="flex items-center font-ui text-gray-600 hover:text-teal transition-colors">
                    {link.label}
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {workDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm font-ui text-gray-600 hover:text-teal hover:bg-gray-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-gray-600 hover:text-teal transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 font-ui text-gray-600 hover:text-teal"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm font-ui text-gray-500 hover:text-teal"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
