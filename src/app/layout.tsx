import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portal Igarapé — Aprenda qualquer matéria, quando quiser",
    template: "%s | Portal Igarapé",
  },
  description:
    "Conteúdo educativo gratuito para estudantes do ensino médio e vestibulandos. Artigos, vídeo aulas, dicas de vestibular e ferramentas de estudo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
