'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Badge, Card, Input } from '@/components/ui';
import type { Video } from '@/lib/types';

// Sample data
const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Turkey-Syria Relations: What\'s Next?',
    description: 'A discussion on the evolving relationship between Turkey and Syria.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'Middle East Institute',
    eventDate: '2024-01-20',
    videoLength: 3600,
    category: 'panel',
    tags: ['Turkey', 'Syria'],
    status: 'published',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Energy Politics in the Eastern Mediterranean',
    description: 'Examining geopolitical implications of gas discoveries.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'ECFR Webinar',
    eventDate: '2024-01-15',
    videoLength: 2700,
    category: 'interview',
    tags: ['Energy', 'Mediterranean'],
    status: 'published',
    createdAt: '2024-01-15',
  },
];

const categoryLabels: Record<string, string> = {
  interview: 'Interview',
  panel: 'Panel Discussion',
  analysis: 'Analysis',
  conference: 'Conference',
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState(sampleVideos);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter((video) => {
    return video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal">Videos</h1>
          <p className="text-gray-600 font-ui">Manage your video appearances and embeds.</p>
        </div>
        <Link href="/admin/add-content?type=video">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Video
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <div className="p-4">
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} padding="none" hover>
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-100">
              {video.thumbnailUrl ? (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-ui px-2 py-1 rounded">
                {formatDuration(video.videoLength)}
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="terracotta" size="sm">
                  {categoryLabels[video.category]}
                </Badge>
                <Badge variant={video.status === 'published' ? 'olive' : 'gray'} size="sm">
                  {video.status}
                </Badge>
              </div>

              <h3 className="font-heading font-semibold text-charcoal line-clamp-2 mb-1">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 font-ui mb-3">
                {video.eventName}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-ui">
                  {new Date(video.eventDate).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  {video.youtubeUrl && (
                    <a 
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-teal"
                      title="View on YouTube"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                  <button 
                    className="p-2 text-gray-400 hover:text-teal"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(video.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 font-ui">No videos found.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
