import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideoById } from "@/lib/content";
import { SUBJECTS } from "@/lib/data";
import { updateVideo } from "@/lib/actions";
import { ArticleContentEditor } from "@/components/admin/ArticleContentEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar Vídeo — Admin" };

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700";

export default async function EditarVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/videos" className="text-gray-500 hover:text-gray-700 text-sm">← Voltar</Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Vídeo</h1>
      </div>
      <form action={updateVideo} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <input type="hidden" name="id" value={video.id} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="title" name="title" type="text" required defaultValue={video.title} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Matéria <span aria-hidden="true" className="text-red-500">*</span></label>
            <select id="subject" name="subject" required defaultValue={video.subject} className={inputClass}>
              {Object.entries(SUBJECTS).map(([key, info]) => (
                <option key={key} value={key}>{info.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
            <input id="duration" name="duration" type="text" defaultValue={video.duration} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">Professor <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="teacher" name="teacher" type="text" required defaultValue={video.teacher} className={inputClass} />
        </div>
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-1">URL ou ID do YouTube</label>
          <input id="youtubeUrl" name="youtubeUrl" type="text" defaultValue={video.youtubeId} placeholder="https://youtube.com/watch?v=... ou dQw4w9WgXcQ" className={inputClass} />
        </div>
        <ArticleContentEditor name="description" label="Descrição do vídeo" defaultValue={video.description} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">Salvar alterações</button>
          <Link href="/admin/videos" className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
