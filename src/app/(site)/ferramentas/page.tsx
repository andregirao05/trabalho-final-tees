import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { getTools } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ferramentas de Estudo",
  description: "Conheça as melhores ferramentas para organizar seus estudos, criar mapas mentais, flashcards e simulados para o ENEM.",
};

export default function FerramentasPage() {
  const studyTools = getTools();
  const categories = [...new Set(studyTools.map((t) => t.category))];

  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ferramentas de Estudo
          </h1>
          <p className="text-gray-600">
            Recursos e ferramentas para tornar seus estudos mais eficientes,
            organizados e produtivos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {categories.map((category) => {
          const tools = studyTools.filter((t) => t.category === category);
          return (
            <section
              key={category}
              aria-label={`Ferramentas de ${category}`}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Dica de produtividade */}
        <aside
          aria-label="Dica de produtividade"
          className="bg-blue-50 border border-blue-100 rounded-lg p-6"
        >
          <h2 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span aria-hidden="true">💡</span>
            Dica de Produtividade
          </h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Combine o <strong>Timer Pomodoro</strong> com os <strong>Flashcards Digitais</strong>:
            estude um conjunto de flashcards durante 25 minutos, faça uma pausa
            de 5 minutos e repita. Após 4 ciclos, descanse por 20 a 30 minutos.
            Esse método mantém o foco e potencializa a memorização a longo prazo.
          </p>
        </aside>
      </div>
    </main>
  );
}
