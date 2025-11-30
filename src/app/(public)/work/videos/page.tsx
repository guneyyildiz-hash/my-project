import { Container } from '@/components/layout';
import { VideoGrid } from '@/components/video';
import type { Video } from '@/lib/types';

// Sample videos
const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Turkey-Syria Relations: What\'s Next?',
    description: 'A discussion on the evolving relationship between Turkey and Syria, and implications for regional stability.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'Middle East Institute',
    eventDate: '2024-01-20',
    videoLength: 3600,
    category: 'panel',
    tags: ['Turkey', 'Syria', 'Foreign Policy'],
    status: 'published',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Energy Politics in the Eastern Mediterranean',
    description: 'Examining the geopolitical implications of gas discoveries in the Eastern Mediterranean.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'ECFR Webinar',
    eventDate: '2024-01-15',
    videoLength: 2700,
    category: 'interview',
    tags: ['Energy', 'Mediterranean', 'Geopolitics'],
    status: 'published',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    title: 'Kurdish Politics: Past, Present, and Future',
    description: 'A comprehensive analysis of Kurdish political movements across the region.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'Cambridge University',
    eventDate: '2024-01-10',
    videoLength: 5400,
    category: 'conference',
    tags: ['Kurdish Politics', 'Turkey', 'Iraq'],
    status: 'published',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    title: 'Gulf States: New Alliances, New Challenges',
    description: 'Discussing the shifting diplomatic landscape of the Gulf region.',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    eventName: 'Chatham House',
    eventDate: '2023-12-20',
    videoLength: 4200,
    category: 'analysis',
    tags: ['Gulf States', 'Saudi Arabia', 'UAE'],
    status: 'published',
    createdAt: '2023-12-20',
  },
];

export const metadata = {
  title: 'Videos | Guney Yildiz',
  description: 'Video appearances, interviews, and panel discussions featuring Guney Yildiz.',
};

export default function VideosPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
            Videos
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Interviews, panel discussions, and conference presentations on Turkey, 
            the Middle East, and international affairs.
          </p>
        </div>

        {/* Videos Grid */}
        <VideoGrid videos={sampleVideos} />
      </Container>
    </div>
  );
}
