'use client';

import { useState } from 'react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    anthropicApiKey: '',
    elevenlabsApiKey: '',
    youtubeApiKey: '',
    supabaseUrl: '',
    supabaseAnonKey: '',
    adminPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      // In a real app, this would save to a secure backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Settings saved successfully!');
    } catch {
      setMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-charcoal">Settings</h1>
        <p className="text-gray-600 font-ui">Configure API keys and preferences for the portfolio.</p>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Input
                type="password"
                label="Anthropic API Key"
                placeholder="sk-ant-..."
                value={settings.anthropicApiKey}
                onChange={(e) => handleChange('anthropicApiKey', e.target.value)}
                helperText="Used for AI-generated summaries and tag suggestions"
              />
            </div>
            <div>
              <Input
                type="password"
                label="ElevenLabs API Key"
                placeholder="..."
                value={settings.elevenlabsApiKey}
                onChange={(e) => handleChange('elevenlabsApiKey', e.target.value)}
                helperText="Used for audio narration generation"
              />
            </div>
            <div>
              <Input
                type="password"
                label="YouTube Data API Key"
                placeholder="AIza..."
                value={settings.youtubeApiKey}
                onChange={(e) => handleChange('youtubeApiKey', e.target.value)}
                helperText="Used for video metadata extraction"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database */}
      <Card>
        <CardHeader>
          <CardTitle>Database (Supabase)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Input
                type="url"
                label="Supabase URL"
                placeholder="https://your-project.supabase.co"
                value={settings.supabaseUrl}
                onChange={(e) => handleChange('supabaseUrl', e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                label="Supabase Anon Key"
                placeholder="eyJ..."
                value={settings.supabaseAnonKey}
                onChange={(e) => handleChange('supabaseAnonKey', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Input
                type="password"
                label="Change Admin Password"
                placeholder="Enter new password..."
                value={settings.adminPassword}
                onChange={(e) => handleChange('adminPassword', e.target.value)}
                helperText="Leave blank to keep current password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Content Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 text-teal rounded focus:ring-teal" />
              <div>
                <p className="font-ui font-medium text-charcoal">Auto-generate audio</p>
                <p className="text-sm text-gray-500">Create audio narration for new articles</p>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 text-teal rounded focus:ring-teal" />
              <div>
                <p className="font-ui font-medium text-charcoal">AI summaries</p>
                <p className="text-sm text-gray-500">Generate key takeaways using Claude AI</p>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 text-teal rounded focus:ring-teal" />
              <div>
                <p className="font-ui font-medium text-charcoal">Auto-suggest tags</p>
                <p className="text-sm text-gray-500">AI-powered tag recommendations</p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        {message && (
          <p className={`font-ui text-sm ${message.includes('success') ? 'text-teal' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <div className="ml-auto">
          <Button onClick={handleSave} isLoading={isSaving} size="lg">
            Save Settings
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-ui font-medium text-charcoal">Delete all content</p>
              <p className="text-sm text-gray-500">Permanently remove all articles and videos</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
