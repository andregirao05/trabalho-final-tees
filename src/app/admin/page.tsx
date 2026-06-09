import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getVideos, getTips, getTools } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Admin — Portal Igarapé" };

const sections = [
  { label: "Artigos", icon: "📝", href: "/admin/artigos", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "Vídeos", icon: "📹", href: "/admin/videos", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { label: "Dicas", icon: "💡", href: "/admin/dicas", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { label: "Ferramentas", icon: "🔧", href: "/admin/ferramentas", color: "bg-green-50 border-green-200 text-green-700" },
];

export default function AdminPage() {
  const counts = {
    Artigos: getArticles().length,
    Vídeos: getVideos().length,
    Dicas: getTips().length,
    Ferramentas: getTools().length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Painel de Administração</h1>
      <p className="text-gray-600 mb-8 text-sm">Gerencie o conteúdo do site Portal Igarapé.</p>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" role="list">
        {sections.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={`flex flex-col items-center gap-2 p-5 rounded-lg border-2 ${s.color} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-opacity`}
            >
              <span className="text-3xl" aria-hidden="true">{s.icon}</span>
              <span className="font-bold text-2xl">{counts[s.label as keyof typeof counts]}</span>
              <span className="text-sm font-medium">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-label="Ações rápidas">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/artigos/novo" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
            + Novo Artigo
          </Link>
          <Link href="/admin/videos/novo" className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
            + Novo Vídeo
          </Link>
          <Link href="/admin/dicas/novo" className="bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2">
            + Nova Dica
          </Link>
          <Link href="/admin/ferramentas/novo" className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2">
            + Nova Ferramenta
          </Link>
        </div>
      </section>
    </div>
  );
}
