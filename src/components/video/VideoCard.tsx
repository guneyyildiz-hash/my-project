import { Badge } from '@/components/ui';
import type { Video } from '@/lib/types';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formattedDate = new Date(video.eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const categoryLabels: Record<string, string> = {
    interview: 'Interview',
    panel: 'Panel Discussion',
    analysis: 'Analysis',
    conference: 'Conference',
  };

  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        {video.thumbnailUrl ? (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-teal ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-ui px-2 py-1 rounded">
          {formatDuration(video.videoLength)}
        </span>
      </div>

      <div className="p-4">
        {/* Category & Date */}
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="terracotta" size="sm">
            {categoryLabels[video.category] || video.category}
          </Badge>
          <span className="text-gray-400 text-xs font-ui">{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-charcoal line-clamp-2 mb-2 group-hover:text-teal transition-colors">
          {video.youtubeUrl ? (
            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          ) : (
            video.title
          )}
        </h3>

        {/* Event name */}
        {video.eventName && (
          <p className="text-sm text-gray-500 font-ui line-clamp-1">
            {video.eventName}
          </p>
        )}
      </div>
    </article>
  );
}
