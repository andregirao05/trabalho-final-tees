import Link from "next/link";
import { CategoryBadge } from "./CategoryBadge";
import { SUBJECTS } from "@/lib/data";
import type { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  const subject = SUBJECTS[video.subject];

  return (
    <article className="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`relative h-40 flex items-center justify-center ${video.youtubeId ? "bg-black" : subject.badge.split(" ")[0]}`}>
        {video.youtubeId ? (
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <span className="text-5xl" aria-hidden="true">{subject.emoji}</span>
        )}
        {video.duration && (
          <span
            className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded"
            aria-label={`Duração: ${video.duration}`}
          >
            {video.duration}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
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
          <Link
            href={`/video-aulas/${video.id}`}
            className="hover:text-blue-700 focus:outline-none focus:underline focus:text-blue-700 after:absolute after:inset-0 after:content-['']"
          >
            {video.title}
          </Link>
        </h3>
        <p className="text-xs text-gray-500">
          {video.teacher}
          {video.views !== "0" && <> · <span>{video.views} visualizações</span></>}
        </p>
      </div>
    </article>
  );
}
