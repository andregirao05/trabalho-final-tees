import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { videos, SUBJECTS } from "@/lib/data";
import type { Subject } from "@/lib/types";

export const metadata: Metadata = {
  title: "Vídeo Aulas",
  description: "Assista a vídeo aulas gratuitas de Matemática, Português, História, Biologia e mais, com professores especializados.",
};

const subjects = Object.entries(SUBJECTS) as [Subject, typeof SUBJECTS[Subject]][];

export default function VideoAulasPage() {
  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vídeo Aulas</h1>
          <p className="text-gray-600">
            Aulas em vídeo com professores especializados para facilitar o
            aprendizado de cada matéria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter */}
        <section aria-label="Filtrar vídeos por matéria" className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Filtrar por matéria
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {subjects.map(([key, info]) => (
              <li key={key}>
                <a
                  href={`#videos-${key}`}
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 ${info.badge}`}
                >
                  {info.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* All videos grouped by subject */}
        {subjects.map(([key, info]) => {
          const subjectVideos = videos.filter((v) => v.subject === key);
          if (subjectVideos.length === 0) return null;
          return (
            <section
              key={key}
              id={`videos-${key}`}
              aria-label={`Vídeo aulas de ${info.label}`}
              className="mb-12 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" aria-hidden="true">{info.emoji}</span>
                <h2 className={`text-lg font-bold ${info.text}`}>{info.label}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subjectVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
