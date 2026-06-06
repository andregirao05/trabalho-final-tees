import { notFound } from "next/navigation";
import Link from "next/link";
import { getVideoById } from "@/lib/content";
import { CategoryBadge } from "@/components/CategoryBadge";
import { MarkdownContent } from "@/components/MarkdownContent";

export const dynamic = "force-dynamic";

export default async function VideoAulaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) notFound();

  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Navegação" className="mb-6">
          <Link href="/video-aulas" className="text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">
            ← Voltar para Vídeo Aulas
          </Link>
        </nav>

        <article>
          <header className="mb-6">
            <div className="mb-3">
              <CategoryBadge subject={video.subject} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {video.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{video.teacher}</span>
              {video.duration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{video.duration}</span>
                </>
              )}
            </div>
          </header>

          {video.youtubeId ? (
            <div className="rounded-xl overflow-hidden shadow-lg bg-black mb-8">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mb-8">
              <p className="text-yellow-800 text-sm">
                Este vídeo ainda não tem URL do YouTube configurada.{" "}
                <Link href={`/admin/videos/${video.id}/editar`} className="font-medium underline hover:text-yellow-900">
                  Configurar no admin →
                </Link>
              </p>
            </div>
          )}

          {video.description && (
            <MarkdownContent content={video.description} />
          )}
        </article>
      </div>
    </main>
  );
}
