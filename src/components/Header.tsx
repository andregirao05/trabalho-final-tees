"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/artigos", label: "Artigos" },
  { href: "/vestibular", label: "Vestibular" },
  { href: "/video-aulas", label: "Vídeo Aulas" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header>
      {/* Top bar */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
            >
              <span aria-hidden="true" className="text-2xl">🎓</span>
              <span>EduBrasil</span>
            </Link>

            {/* Search — desktop */}
            <form
              role="search"
              aria-label="Buscar conteúdo"
              action="/busca"
              method="GET"
              className="hidden md:flex items-center flex-1 max-w-md"
            >
              <label htmlFor="search-desktop" className="sr-only">
                Buscar artigos e matérias
              </label>
              <input
                id="search-desktop"
                name="q"
                type="search"
                placeholder="Buscar artigos, matérias..."
                className="w-full rounded-l-md px-4 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                aria-label="Realizar busca"
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </form>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav aria-label="Menu principal" className="hidden md:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-4 py-3 text-sm font-medium transition-colors border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-inset ${
                      isActive
                        ? "text-blue-700 border-blue-700"
                        : "text-gray-700 border-transparent hover:text-blue-700 hover:border-blue-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`md:hidden bg-white border-b border-gray-200 shadow-sm ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-3">
          <form role="search" aria-label="Buscar conteúdo" action="/busca" method="GET">
            <label htmlFor="search-mobile" className="sr-only">
              Buscar artigos e matérias
            </label>
            <input
              id="search-mobile"
              name="q"
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </form>
        </div>
        <nav aria-label="Menu principal (mobile)">
          <ul role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex px-4 py-3 text-sm font-medium border-l-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700 ${
                      isActive
                        ? "text-blue-700 border-blue-700 bg-blue-50"
                        : "text-gray-700 border-transparent hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
