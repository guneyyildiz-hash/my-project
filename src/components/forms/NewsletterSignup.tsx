'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-teal/5 border border-teal/20 rounded-xl p-6">
      <h3 className="font-heading font-semibold text-charcoal mb-2">
        Stay Updated
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Get the latest articles and analysis delivered to your inbox.
      </p>

      {status === 'success' ? (
        <p className="text-teal font-ui">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" isLoading={status === 'loading'}>
            Subscribe
          </Button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-sm mt-2 font-ui">{message}</p>
      )}
    </div>
  );
}
