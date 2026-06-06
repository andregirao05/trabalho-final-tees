import Link from "next/link";

const materiasLinks = [
  { href: "/artigos?materia=matematica", label: "Matemática" },
  { href: "/artigos?materia=portugues", label: "Português" },
  { href: "/artigos?materia=historia", label: "História" },
  { href: "/artigos?materia=geografia", label: "Geografia" },
  { href: "/artigos?materia=biologia", label: "Biologia" },
];

const siteLinks = [
  { href: "/artigos", label: "Artigos" },
  { href: "/vestibular", label: "Vestibular" },
  { href: "/video-aulas", label: "Vídeo Aulas" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/sobre", label: "Sobre" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" aria-label="Rodapé do site">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl mb-3 focus:outline-none focus:ring-2 focus:ring-white rounded-sm w-fit"
            >
              <span aria-hidden="true">🎓</span>
              <span>EduBrasil</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Conteúdo educativo gratuito para estudantes do ensino médio e
              vestibulandos. Aprenda no seu ritmo, quando e onde quiser.
            </p>
          </div>

          {/* Matérias */}
          <nav aria-label="Links para matérias">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Matérias
            </h2>
            <ul className="space-y-2" role="list">
              {materiasLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegação */}
          <nav aria-label="Links do site">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navegação
            </h2>
            <ul className="space-y-2" role="list">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-gray-500 text-center">
          <p>
            &copy; {new Date().getFullYear()} EduBrasil. Conteúdo educativo gratuito.
          </p>
        </div>
      </div>
    </footer>
  );
}
