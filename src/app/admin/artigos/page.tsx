import Link from "next/link";
import { getArticles } from "@/lib/content";
import { SUBJECTS } from "@/lib/data";
import { deleteArticle } from "@/lib/actions";
import { DeleteForm } from "@/components/admin/DeleteForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Artigos — Admin" };

export default function AdminArtigosPage() {
  const articles = getArticles();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Artigos</h1>
        <Link href="/admin/artigos/novo" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
          + Novo Artigo
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm" aria-label="Lista de artigos">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Título</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Matéria</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Autor</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Destaque</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{a.title}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SUBJECTS[a.subject].badge}`}>
                    {SUBJECTS[a.subject].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.author}</td>
                <td className="px-4 py-3">
                  {a.featured ? <span className="text-green-600 font-medium">Sim</span> : <span className="text-gray-400">Não</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/artigos/${a.id}/editar`} className="text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">Editar</Link>
                    <DeleteForm id={a.id} label={a.title} action={deleteArticle} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p className="px-4 py-8 text-center text-gray-500">Nenhum artigo cadastrado.</p>}
      </div>
    </div>
  );
}
