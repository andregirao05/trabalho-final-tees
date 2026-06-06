import Link from "next/link";
import { SUBJECTS } from "@/lib/data";
import { createVideo } from "@/lib/actions";
import { ArticleContentEditor } from "@/components/admin/ArticleContentEditor";

export const metadata = { title: "Novo Vídeo — Admin" };

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700";

export default function NovoVideoPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/videos" className="text-gray-500 hover:text-gray-700 text-sm">← Voltar</Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Vídeo</h1>
      </div>
      <form action={createVideo} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Matéria <span aria-hidden="true" className="text-red-500">*</span></label>
            <select id="subject" name="subject" required className={inputClass}>
              {Object.entries(SUBJECTS).map(([key, info]) => (
                <option key={key} value={key}>{info.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duração (ex: 18:42) <span aria-hidden="true" className="text-red-500">*</span></label>
            <input id="duration" name="duration" type="text" required placeholder="00:00" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">Professor <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="teacher" name="teacher" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-1">URL ou ID do YouTube</label>
          <input id="youtubeUrl" name="youtubeUrl" type="text" placeholder="https://youtube.com/watch?v=... ou dQw4w9WgXcQ" className={inputClass} />
        </div>
        <ArticleContentEditor name="description" label="Descrição do vídeo" />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">Salvar vídeo</button>
          <Link href="/admin/videos" className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
