import Link from "next/link";
import { getVideos } from "@/lib/content";
import { SUBJECTS } from "@/lib/data";
import { deleteVideo } from "@/lib/actions";
import { DeleteForm } from "@/components/admin/DeleteForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vídeos — Admin" };

export default function AdminVideosPage() {
  const videos = getVideos();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vídeo Aulas</h1>
        <Link href="/admin/videos/novo" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
          + Novo Vídeo
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm" aria-label="Lista de vídeo aulas">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Título</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Matéria</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Professor</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Duração</th>
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {videos.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{v.title}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SUBJECTS[v.subject].badge}`}>
                    {SUBJECTS[v.subject].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{v.teacher}</td>
                <td className="px-4 py-3 text-gray-600">{v.duration}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/videos/${v.id}/editar`} className="text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm">Editar</Link>
                    <DeleteForm id={v.id} label={v.title} action={deleteVideo} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {videos.length === 0 && <p className="px-4 py-8 text-center text-gray-500">Nenhum vídeo cadastrado.</p>}
      </div>
    </div>
  );
}
