import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolById } from "@/lib/content";
import { updateTool } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar Ferramenta — Admin" };

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700";

export default async function EditarFerramentaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/ferramentas" className="text-gray-500 hover:text-gray-700 text-sm">← Voltar</Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Ferramenta</h1>
      </div>
      <form action={updateTool} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <input type="hidden" name="id" value={tool.id} />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">Ícone (emoji)</label>
            <input id="icon" name="icon" type="text" defaultValue={tool.icon} className={inputClass} />
          </div>
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome <span aria-hidden="true" className="text-red-500">*</span></label>
            <input id="name" name="name" type="text" required defaultValue={tool.name} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição <span aria-hidden="true" className="text-red-500">*</span></label>
          <textarea id="description" name="description" required rows={3} defaultValue={tool.description} className={`${inputClass} resize-none`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria <span aria-hidden="true" className="text-red-500">*</span></label>
            <input id="category" name="category" type="text" required defaultValue={tool.category} className={inputClass} />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input id="url" name="url" type="text" defaultValue={tool.url} className={inputClass} />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">Salvar alterações</button>
          <Link href="/admin/ferramentas" className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
