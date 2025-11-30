import VideoCard from './VideoCard';
import type { Video } from '@/lib/types';

interface VideoGridProps {
  videos: Video[];
  columns?: 2 | 3 | 4;
}

export default function VideoGrid({ videos, columns = 3 }: VideoGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-ui">No videos found.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
