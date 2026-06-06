import { CategoryBadge } from "./CategoryBadge";
import { SUBJECTS } from "@/lib/data";
import type { Video } from "@/lib/types";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const subject = SUBJECTS[video.subject];

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div
        className={`relative h-40 flex items-center justify-center ${subject.badge.split(" ")[0]}`}
        role="img"
        aria-label={`Miniatura do vídeo: ${video.title}`}
      >
        <span className="text-5xl" aria-hidden="true">{subject.emoji}</span>
        <span
          className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded"
          aria-label={`Duração: ${video.duration}`}
        >
          {video.duration}
        </span>
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <CategoryBadge subject={video.subject} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500">
          {video.teacher} · <span>{video.views} visualizações</span>
        </p>
      </div>
    </article>
  );
}
