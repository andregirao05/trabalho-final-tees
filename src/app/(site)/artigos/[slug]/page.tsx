import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/content";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownContent } from "@/components/MarkdownContent";

export const dynamic = "force-dynamic";

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      {article.imageUrl && (
        <div className="w-full h-64 md:h-80 overflow-hidden bg-gray-200">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Navegação" className="mb-6">
          <Link href="/artigos" className="text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">
            ← Voltar para Artigos
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="mb-3">
              <CategoryBadge subject={article.subject} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-5">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{article.date}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime} min de leitura</span>
            </div>
          </header>

          {article.content ? (
            <MarkdownContent content={article.content} />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-800 text-sm">
                Este artigo ainda não tem conteúdo.{" "}
                <Link href={`/admin/artigos/${article.id}/editar`} className="font-medium underline hover:text-yellow-900">
                  Adicionar conteúdo no admin →
                </Link>
              </p>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
