import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";
import { ToolCard } from "@/components/ToolCard";
import { articles, videos, vestibularTips, studyTools, SUBJECTS } from "@/lib/data";
import type { Subject } from "@/lib/types";

export const metadata: Metadata = {
  title: "EduBrasil — Aprenda qualquer matéria, quando quiser",
};

const subjectOrder: Subject[] = [
  "matematica", "portugues", "historia", "geografia", "biologia",
  "quimica", "fisica", "literatura", "filosofia", "sociologia",
];

export default function HomePage() {
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <main id="conteudo-principal" className="flex-1">
      {/* Hero */}
      <section aria-label="Destaque principal" className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Aprenda qualquer matéria, quando quiser
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Artigos, vídeo aulas e dicas de vestibular 100% gratuitos para
              estudantes do ensino médio e vestibulandos de todo o Brasil.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/artigos"
                className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 transition-colors"
              >
                Explorar Artigos
              </Link>
              <Link
                href="/video-aulas"
                className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 transition-colors"
              >
                Ver Vídeo Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Matérias */}
      <section aria-label="Navegar por matéria" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Matérias</h2>
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
            role="list"
          >
            {subjectOrder.map((subject) => {
              const info = SUBJECTS[subject];
              return (
                <li key={subject}>
                  <Link
                    href={`/artigos?materia=${subject}`}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 ${info.border} ${info.bg} ${info.text} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-opacity text-center font-semibold text-sm`}
                  >
                    <span className="text-2xl" aria-hidden="true">{info.emoji}</span>
                    <span>{info.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section aria-label="Artigos em destaque" className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Artigos em Destaque</h2>
            <Link
              href="/artigos"
              className="text-sm text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Vídeo Aulas */}
      <section aria-label="Vídeo aulas em destaque" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Vídeo Aulas</h2>
            <Link
              href="/video-aulas"
              className="text-sm text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Dicas para o Vestibular */}
      <section aria-label="Dicas para o vestibular" className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Dicas para o Vestibular</h2>
            <Link
              href="/vestibular"
              className="text-sm text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm"
            >
              Ver mais →
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
            {vestibularTips.slice(0, 3).map((tip) => (
              <li key={tip.id}>
                <article className="bg-white rounded-lg border border-blue-100 p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl" aria-hidden="true">{tip.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ferramentas */}
      <section aria-label="Ferramentas de estudo" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Ferramentas de Estudo</h2>
            <Link
              href="/ferramentas"
              className="text-sm text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
