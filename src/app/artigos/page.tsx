import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles, SUBJECTS } from "@/lib/data";
import type { Subject } from "@/lib/types";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Explore artigos educativos organizados por matéria: Matemática, Português, História, Biologia e muito mais.",
};

const subjects = Object.entries(SUBJECTS) as [Subject, typeof SUBJECTS[Subject]][];

export default function ArtigosPage() {
  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Artigos</h1>
          <p className="text-gray-600">
            Explore conteúdos educativos organizados por matéria e aprofunde seu
            conhecimento.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter by subject */}
        <section aria-label="Filtrar por matéria" className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Filtrar por matéria
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {subjects.map(([key, info]) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 ${info.badge}`}
                >
                  {info.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Articles grouped by subject */}
        {subjects.map(([key, info]) => {
          const subjectArticles = articles.filter((a) => a.subject === key);
          if (subjectArticles.length === 0) return null;
          return (
            <section
              key={key}
              id={key}
              aria-label={`Artigos de ${info.label}`}
              className="mb-12 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" aria-hidden="true">{info.emoji}</span>
                <h2 className={`text-lg font-bold ${info.text}`}>{info.label}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subjectArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
