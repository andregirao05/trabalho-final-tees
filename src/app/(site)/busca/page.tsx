import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getVideos, getTips, getTools } from "@/lib/content";
import { SUBJECTS } from "@/lib/data";
import { CategoryBadge } from "@/components/CategoryBadge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Busca" };

function match(query: string, ...fields: (string | undefined)[]): boolean {
  const q = query.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(q));
}

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const articles = query
    ? getArticles().filter((a) =>
        match(query, a.title, a.excerpt, a.author, SUBJECTS[a.subject]?.label, a.content)
      )
    : [];

  const videos = query
    ? getVideos().filter((v) =>
        match(query, v.title, v.teacher, SUBJECTS[v.subject]?.label, v.description)
      )
    : [];

  const tips = query
    ? getTips().filter((t) => match(query, t.title, t.content))
    : [];

  const tools = query
    ? getTools().filter((t) =>
        match(query, t.name, t.description, t.category)
      )
    : [];

  const total = articles.length + videos.length + tips.length + tools.length;

  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      {/* Search header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Busca</h1>
          <form role="search" aria-label="Buscar conteúdo" action="/busca" method="GET" className="flex gap-2">
            <label htmlFor="search-page" className="sr-only">Buscar artigos, vídeos e matérias</label>
            <input
              id="search-page"
              name="q"
              type="search"
              defaultValue={query}
              autoFocus
              placeholder="Buscar artigos, vídeos, dicas..."
              className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-r-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              Buscar
            </button>
          </form>
          {query && (
            <p className="mt-3 text-sm text-gray-600" aria-live="polite">
              {total > 0
                ? `${total} resultado${total !== 1 ? "s" : ""} para "${query}"`
                : `Nenhum resultado para "${query}"`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {!query && (
          <p className="text-gray-500 text-sm">Digite algo no campo acima para buscar.</p>
        )}

        {/* Articles */}
        {articles.length > 0 && (
          <section aria-label="Artigos encontrados">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span aria-hidden="true">📄</span> Artigos
              <span className="text-sm font-normal text-gray-500">({articles.length})</span>
            </h2>
            <ul className="space-y-3" role="list">
              {articles.map((a) => (
                <li key={a.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <CategoryBadge subject={a.subject} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        <Link href={`/artigos/${a.slug}`} className="hover:text-blue-700 focus:outline-none focus:underline">
                          {a.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{a.excerpt}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.author} · {a.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section aria-label="Vídeos encontrados">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span aria-hidden="true">🎬</span> Vídeo Aulas
              <span className="text-sm font-normal text-gray-500">({videos.length})</span>
            </h2>
            <ul className="space-y-3" role="list">
              {videos.map((v) => (
                <li key={v.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="mb-1">
                    <CategoryBadge subject={v.subject} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    <Link href={`/video-aulas/${v.id}`} className="hover:text-blue-700 focus:outline-none focus:underline">
                      {v.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-400">{v.teacher}{v.duration && ` · ${v.duration}`}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tips */}
        {tips.length > 0 && (
          <section aria-label="Dicas encontradas">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span aria-hidden="true">💡</span> Dicas para o Vestibular
              <span className="text-sm font-normal text-gray-500">({tips.length})</span>
            </h2>
            <ul className="space-y-3" role="list">
              {tips.map((t) => (
                <li key={t.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">{t.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{t.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tools */}
        {tools.length > 0 && (
          <section aria-label="Ferramentas encontradas">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span aria-hidden="true">🔧</span> Ferramentas
              <span className="text-sm font-normal text-gray-500">({tools.length})</span>
            </h2>
            <ul className="space-y-3" role="list">
              {tools.map((t) => (
                <li key={t.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">{t.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {t.url && t.url !== "#" ? (
                          <a href={t.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 focus:outline-none focus:underline">
                            {t.name} <span className="text-xs font-normal text-gray-400">(abre em nova aba)</span>
                          </a>
                        ) : t.name}
                      </h3>
                      <p className="text-xs text-gray-600">{t.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {query && total === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
            <p className="text-gray-700 font-medium mb-1">Nenhum resultado encontrado</p>
            <p className="text-sm text-gray-500">Tente outras palavras ou navegue pelas seções do site.</p>
          </div>
        )}
      </div>
    </main>
  );
}
