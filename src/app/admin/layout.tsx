"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/artigos", label: "Artigos", icon: "📝" },
  { href: "/admin/videos", label: "Vídeos", icon: "📹" },
  { href: "/admin/dicas", label: "Dicas", icon: "💡" },
  { href: "/admin/ferramentas", label: "Ferramentas", icon: "🔧" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-56 bg-gray-900 text-white flex-shrink-0 flex flex-col" aria-label="Menu de administração">
        <div className="p-4 border-b border-gray-700">
          <p className="font-bold text-white text-base">EduBrasil Admin</p>
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-white rounded-sm mt-1 block"
          >
            ← Ver site
          </Link>
        </div>
        <nav className="p-3 flex-1">
          <ul className="space-y-1" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto" id="conteudo-principal">
        {children}
      </main>
      <AccessibilityToolbar />
    </div>
  );
}
