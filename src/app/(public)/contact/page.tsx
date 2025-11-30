'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { ContactForm } from '@/components/forms';

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<'media' | 'speaking' | 'consultation'>('media');

  const formTypes = [
    { id: 'media' as const, label: 'Media Inquiry', icon: '📰' },
    { id: 'speaking' as const, label: 'Speaking Request', icon: '🎤' },
    { id: 'consultation' as const, label: 'Consultation', icon: '💼' },
  ];

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you&apos;re looking for an interview, a speaker, or expert consultation, 
            I&apos;d be happy to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Quick Contact */}
              <div>
                <h2 className="font-heading font-semibold text-charcoal mb-4">
                  Quick Contact
                </h2>
                <div className="space-y-4">
                  <a 
                    href="mailto:contact@guneyyildiz.co"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@guneyyildiz.co
                  </a>
                  <a 
                    href="https://twitter.com/guneyyildiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @guneyyildiz
                  </a>
                  <a 
                    href="https://linkedin.com/in/guneyyildiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-teal/5 border border-teal/20 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-charcoal mb-2">
                  Response Time
                </h3>
                <p className="text-gray-600 text-sm">
                  I typically respond to inquiries within 24-48 hours. For urgent media 
                  requests, please mention your deadline in the message.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {/* Form Type Selector */}
            <div className="flex flex-wrap gap-3 mb-8">
              {formTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveForm(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm transition-colors ${
                    activeForm === type.id
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <ContactForm type={activeForm} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
