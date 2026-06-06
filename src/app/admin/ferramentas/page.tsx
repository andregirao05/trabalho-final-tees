import Link from "next/link";
import { getTools } from "@/lib/content";
import { deleteTool } from "@/lib/actions";
import { DeleteForm } from "@/components/admin/DeleteForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ferramentas — Admin" };

export default function AdminFerramentasPage() {
  const tools = getTools();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ferramentas de Estudo</h1>
        <Link href="/admin/ferramentas/novo" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
          + Nova Ferramenta
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm" aria-label="Lista de ferramentas">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ícone</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Nome</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Categoria</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Descrição</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tools.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xl">{t.icon}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                <td className="px-4 py-3 text-gray-600">{t.category}</td>
                <td className="px-4 py-3 text-gray-600 max-w-sm truncate">{t.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/ferramentas/${t.id}/editar`} className="text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">Editar</Link>
                    <DeleteForm id={t.id} label={t.name} action={deleteTool} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tools.length === 0 && <p className="px-4 py-8 text-center text-gray-500">Nenhuma ferramenta cadastrada.</p>}
      </div>
    </div>
  );
}
