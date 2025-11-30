'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

interface ContactFormProps {
  type: 'media' | 'speaking' | 'consultation';
}

const formConfig = {
  media: {
    title: 'Media Inquiry',
    description: 'For interview requests, source information, or media appearances.',
    fields: ['name', 'email', 'organization', 'deadline', 'topic', 'message'],
  },
  speaking: {
    title: 'Speaking Request',
    description: 'Invite me to speak at your event, conference, or institution.',
    fields: ['name', 'email', 'organization', 'eventName', 'eventDate', 'audience', 'message'],
  },
  consultation: {
    title: 'Consultation Request',
    description: 'For political risk analysis, research collaboration, or advisory services.',
    fields: ['name', 'email', 'organization', 'projectType', 'timeline', 'message'],
  },
};

export default function ContactForm({ type }: ContactFormProps) {
  const config = formConfig[type];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({});
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-charcoal mb-2">Message Sent!</h3>
        <p className="text-gray-600">Thank you for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading font-semibold text-xl text-charcoal mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-6">{config.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="name"
            label="Your Name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            label="Email Address"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="organization"
          label="Organization"
          value={formData.organization || ''}
          onChange={handleChange}
        />

        {type === 'media' && (
          <>
            <Input
              name="deadline"
              label="Deadline"
              placeholder="e.g., This Friday, ASAP, Flexible"
              value={formData.deadline || ''}
              onChange={handleChange}
            />
            <Input
              name="topic"
              label="Topic / Subject"
              value={formData.topic || ''}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === 'speaking' && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="eventName"
                label="Event Name"
                value={formData.eventName || ''}
                onChange={handleChange}
                required
              />
              <Input
                name="eventDate"
                type="date"
                label="Event Date"
                value={formData.eventDate || ''}
                onChange={handleChange}
              />
            </div>
            <Input
              name="audience"
              label="Expected Audience"
              placeholder="e.g., 200 policy professionals"
              value={formData.audience || ''}
              onChange={handleChange}
            />
          </>
        )}

        {type === 'consultation' && (
          <>
            <Input
              name="projectType"
              label="Project Type"
              placeholder="e.g., Risk assessment, Research report, Strategic brief"
              value={formData.projectType || ''}
              onChange={handleChange}
              required
            />
            <Input
              name="timeline"
              label="Timeline"
              placeholder="e.g., 2 weeks, 1 month"
              value={formData.timeline || ''}
              onChange={handleChange}
            />
          </>
        )}

        <div>
          <label className="block text-sm font-ui font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={formData.message || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 font-ui text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
            placeholder="Tell me more about your request..."
          />
        </div>

        <Button type="submit" isLoading={status === 'loading'} size="lg">
          Send Message
        </Button>

        {status === 'error' && (
          <p className="text-red-500 text-sm font-ui">
            Something went wrong. Please try again or email directly.
          </p>
        )}
      </form>
    </div>
  );
}
