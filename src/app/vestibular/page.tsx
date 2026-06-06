import type { Metadata } from "next";
import { vestibularTips } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vestibular",
  description: "Dicas, estratégias e informações sobre o ENEM e principais vestibulares do Brasil para você se preparar com mais eficiência.",
};

const enem = [
  { label: "Data da prova", value: "Novembro (1º e 2º domingo)" },
  { label: "Áreas avaliadas", value: "Linguagens, Matemática, Humanas e Natureza" },
  { label: "Redação", value: "Texto dissertativo-argumentativo, nota de 0 a 1000" },
  { label: "Total de questões", value: "180 questões objetivas + 1 redação" },
  { label: "Inscrição", value: "Geralmente em maio/junho pelo site do INEP" },
];

export default function VestibularPage() {
  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      {/* Page header */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Vestibular e ENEM</h1>
          <p className="text-blue-100">
            Tudo o que você precisa saber para se preparar, conquistar uma boa
            nota e ingressar na universidade dos seus sonhos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* ENEM Info */}
        <section aria-label="Informações sobre o ENEM">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            O que é o ENEM?
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              O Exame Nacional do Ensino Médio (ENEM) é a principal porta de
              entrada para o ensino superior público e privado no Brasil. Os
              resultados são usados para ingressar em universidades federais
              pelo SISU, obter bolsas pelo ProUni e financiamentos pelo FIES.
            </p>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enem.map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-md p-4">
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Tips */}
        <section aria-label="Dicas para se sair bem no vestibular">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Dicas para se sair bem
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
            {vestibularTips.map((tip) => (
              <li key={tip.id}>
                <article className="bg-white rounded-lg border border-gray-200 p-5 h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-3xl w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg"
                      aria-hidden="true"
                    >
                      {tip.icon}
                    </span>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Cronograma sugerido */}
        <section aria-label="Cronograma sugerido de estudos">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Cronograma Sugerido de Estudos
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm" aria-label="Cronograma semanal de estudos por matéria">
              <caption className="sr-only">
                Sugestão de distribuição de matérias ao longo da semana
              </caption>
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Dia</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Manhã</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Tarde</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Noite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Segunda", "Matemática", "Física", "Revisão"],
                  ["Terça", "Português", "Literatura", "Redação"],
                  ["Quarta", "História", "Geografia", "Filosofia"],
                  ["Quinta", "Biologia", "Química", "Revisão"],
                  ["Sexta", "Matemática", "Português", "Simulado"],
                  ["Sábado", "Revisão geral", "Provas anteriores", "Descanso"],
                  ["Domingo", "Descanso", "Leitura livre", "Planejamento"],
                ].map(([day, morning, afternoon, evening]) => (
                  <tr key={day} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{day}</td>
                    <td className="px-4 py-3 text-gray-600">{morning}</td>
                    <td className="px-4 py-3 text-gray-600">{afternoon}</td>
                    <td className="px-4 py-3 text-gray-600">{evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
