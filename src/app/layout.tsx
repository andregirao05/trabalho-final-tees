import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipToContent } from "@/components/SkipToContent";

export const metadata: Metadata = {
  title: {
    default: "EduBrasil — Aprenda qualquer matéria, quando quiser",
    template: "%s | EduBrasil",
  },
  description:
    "Conteúdo educativo gratuito para estudantes do ensino médio e vestibulandos. Artigos, vídeo aulas, dicas de vestibular e ferramentas de estudo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50" suppressHydrationWarning>
        <Theme accentColor="blue" radius="medium">
          <SkipToContent />
          <Header />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
