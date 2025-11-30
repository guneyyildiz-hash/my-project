'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent, Badge, Spinner } from '@/components/ui';
import type { ExtractedContent } from '@/lib/types';

type IngestionStatus = 'idle' | 'fetching' | 'enhancing' | 'generating-audio' | 'ready' | 'publishing' | 'error';

export default function AddContentPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<IngestionStatus>('idle');
  const [error, setError] = useState('');
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null);
  const [editableContent, setEditableContent] = useState<Partial<ExtractedContent>>({});

  const statusMessages: Record<IngestionStatus, string> = {
    idle: '',
    fetching: 'Fetching content from URL...',
    enhancing: 'Generating AI summary and tags...',
    'generating-audio': 'Creating audio narration...',
    ready: 'Content ready for review',
    publishing: 'Publishing content...',
    error: 'An error occurred',
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('fetching');

    try {
      // Step 1: Fetch and extract content
      const response = await fetch('/api/admin/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      
      // Simulate the full pipeline for demo
      setStatus('enhancing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('generating-audio');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setExtractedContent(data);
      setEditableContent(data);
      setStatus('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    }
  };

  const handlePublish = async () => {
    setStatus('publishing');

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editableContent,
          status: 'published',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish');
      }

      router.push('/admin/articles');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish');
      setStatus('error');
    }
  };

  const handleSaveDraft = async () => {
    try {
      await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editableContent,
          status: 'draft',
        }),
      });
      router.push('/admin/articles');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
    }
  };

  const isProcessing = ['fetching', 'enhancing', 'generating-audio', 'publishing'].includes(status);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-charcoal">Add Content</h1>
        <p className="text-gray-600 font-ui">
          Paste a URL to automatically extract and publish content in minutes.
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardContent>
          <form onSubmit={handleFetch} className="space-y-4">
            <div>
              <label className="block text-sm font-ui font-medium text-gray-700 mb-2">
                Content URL
              </label>
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="https://forbes.com/sites/guneyyildiz/2024/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={isProcessing}
                  className="flex-1"
                />
                <Button type="submit" isLoading={isProcessing} disabled={!url}>
                  {status === 'idle' ? 'Fetch Content' : 'Processing...'}
                </Button>
              </div>
            </div>

            {/* Supported Sources */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-gray-400 font-ui">Supported:</span>
              {['Forbes', 'BBC', 'YouTube', 'SWP Berlin', 'ECFR', 'MEI', 'Generic URLs'].map((source) => (
                <Badge key={source} variant="gray" size="sm">{source}</Badge>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <Spinner size="md" />
              <div>
                <p className="font-ui font-medium text-charcoal">{statusMessages[status]}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${status === 'fetching' ? 'bg-teal text-white' : 'bg-gray-100 text-gray-400'}`}>
                    1. Fetch
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${status === 'enhancing' ? 'bg-teal text-white' : 'bg-gray-100 text-gray-400'}`}>
                    2. AI Enhance
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${status === 'generating-audio' ? 'bg-teal text-white' : 'bg-gray-100 text-gray-400'}`}>
                    3. Audio
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {status === 'error' && error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent>
            <p className="text-red-600 font-ui">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Content Preview */}
      {(status === 'ready' || status === 'publishing') && extractedContent && (
        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="space-y-6">
                {/* Source Badge */}
                <div className="flex items-center gap-3">
                  <Badge variant="teal">{extractedContent.source}</Badge>
                  <span className="text-sm text-gray-500 font-ui">
                    {extractedContent.readingTime} min read
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-ui font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editableContent.title || ''}
                    onChange={(e) => setEditableContent({ ...editableContent, title: e.target.value })}
                    className="w-full px-4 py-2 text-xl font-heading font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-ui font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={editableContent.excerpt || ''}
                    onChange={(e) => setEditableContent({ ...editableContent, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                {/* Summary Bullets */}
                <div>
                  <label className="block text-sm font-ui font-medium text-gray-700 mb-2">
                    Key Takeaways (AI Generated)
                  </label>
                  <div className="space-y-2">
                    {(editableContent.summaryBullets || []).map((bullet, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-ui">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const newBullets = [...(editableContent.summaryBullets || [])];
                            newBullets[index] = e.target.value;
                            setEditableContent({ ...editableContent, summaryBullets: newBullets });
                          }}
                          className="flex-1 px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-ui font-medium text-gray-700 mb-2">
                    Tags (AI Suggested)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(editableContent.tags || []).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm font-ui"
                      >
                        {tag}
                        <button
                          onClick={() => {
                            const newTags = (editableContent.tags || []).filter((_, i) => i !== index);
                            setEditableContent({ ...editableContent, tags: newTags });
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        const newTag = prompt('Enter new tag:');
                        if (newTag) {
                          setEditableContent({
                            ...editableContent,
                            tags: [...(editableContent.tags || []), newTag],
                          });
                        }
                      }}
                      className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-teal hover:text-teal"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Audio Status */}
                {extractedContent.audioUrl && (
                  <div className="bg-navy/5 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎧</span>
                      <div>
                        <p className="font-ui font-medium text-charcoal">Audio Generated</p>
                        <p className="text-sm text-gray-500">
                          Duration: {Math.ceil((extractedContent.audioLength || 0) / 60)} minutes
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => {
              setStatus('idle');
              setExtractedContent(null);
              setEditableContent({});
              setUrl('');
            }}>
              ← Start Over
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button onClick={handlePublish} isLoading={status === 'publishing'}>
                Publish Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
