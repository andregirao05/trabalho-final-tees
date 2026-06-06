import Link from "next/link";
import { getTips } from "@/lib/content";
import { deleteTip } from "@/lib/actions";
import { DeleteForm } from "@/components/admin/DeleteForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dicas — Admin" };

export default function AdminDicasPage() {
  const tips = getTips();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dicas para o Vestibular</h1>
        <Link href="/admin/dicas/novo" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
          + Nova Dica
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm" aria-label="Lista de dicas">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ícone</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Título</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Conteúdo</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tips.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xl">{t.icon}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{t.title}</td>
                <td className="px-4 py-3 text-gray-600 max-w-sm truncate">{t.content}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/dicas/${t.id}/editar`} className="text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">Editar</Link>
                    <DeleteForm id={t.id} label={t.title} action={deleteTip} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tips.length === 0 && <p className="px-4 py-8 text-center text-gray-500">Nenhuma dica cadastrada.</p>}
      </div>
    </div>
  );
}
