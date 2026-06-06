import Link from "next/link";
import { SUBJECTS } from "@/lib/data";
import { createArticle } from "@/lib/actions";

export const metadata = { title: "Novo Artigo — Admin" };

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700";

export default function NovoArtigoPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/artigos" className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-sm">← Voltar</Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Artigo</h1>
      </div>
      <form action={createArticle} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Resumo <span aria-hidden="true" className="text-red-500">*</span></label>
          <textarea id="excerpt" name="excerpt" required rows={3} className={`${inputClass} resize-none`} />
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
            <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">Tempo de leitura (min)</label>
            <input id="readTime" name="readTime" type="number" min="1" defaultValue="5" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Autor <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="author" name="author" type="text" required className={inputClass} />
        </div>
        <div className="flex items-center gap-2">
          <input id="featured" name="featured" type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-700" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Exibir como destaque na home</label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">Salvar artigo</button>
          <Link href="/admin/artigos" className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
