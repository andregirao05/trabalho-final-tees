import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o Portal Igarapé, uma plataforma educativa gratuita e acessível voltada para estudantes da região amazônica que se preparam para o vestibular.",
};

const values = [
  { icon: "📖", title: "Gratuidade", description: "Todo o conteúdo é 100% gratuito e acessível para qualquer estudante da Amazônia, sem cadastro obrigatório." },
  { icon: "✅", title: "Regionalidade", description: "Conteúdo voltado para os vestibulares da região: ENEM, PSC UFAM, SIS UEA e Vestibular Macro UEA." },
  { icon: "♿", title: "Acessibilidade", description: "Desenvolvido seguindo os padrões WCAG 2.1 AA, com ferramentas como lupa de texto, guia de leitura e modo TDAH." },
  { icon: "📱", title: "Inclusão Digital", description: "Interface leve e responsiva para funcionar bem mesmo em conexões limitadas, do celular ao computador." },
];

export default function SobrePage() {
  return (
    <main id="conteudo-principal" className="flex-1 bg-gray-50">
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Sobre o Portal Igarapé</h1>
          <p className="text-blue-100">
            Nossa missão é garantir que estudantes da região amazônica tenham
            acesso a conteúdo educacional de qualidade, com inclusão digital
            e acessibilidade como pilares fundamentais.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* About */}
        <section aria-label="O que é o Portal Igarapé">
          <h2 className="text-xl font-bold text-gray-900 mb-4">O que é o Portal Igarapé?</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-gray-600 space-y-4 leading-relaxed text-sm">
            <p>
              O <strong className="text-gray-900">Portal Igarapé</strong> é uma plataforma educativa gratuita
              focada em estudantes da <strong className="text-gray-900">região amazônica</strong> que se preparam
              para o ENEM, PSC da UFAM, SIS e Vestibular Macro da UEA. Nosso objetivo é
              oferecer conteúdo de alta qualidade — artigos, vídeo aulas, dicas
              de vestibular e ferramentas de estudo — de forma acessível, clara
              e sem barreiras.
            </p>
            <p>
              Sabemos que muitos estudantes do Amazonas enfrentam desafios únicos:
              distâncias geográficas, conectividade limitada e falta de materiais
              preparatórios regionalizados. Por isso, o Portal Igarapé nasce com
              o compromisso de ser gratuito, leve e verdadeiramente inclusivo —
              para que a origem não defina o destino de nenhum estudante.
            </p>
            <p>
              Nossa plataforma foi desenvolvida seguindo os padrões de
              acessibilidade digital <strong className="text-gray-900">WCAG 2.1 nível AA</strong>,
              com ferramentas de acessibilidade integradas — modo de alto contraste,
              lupa de texto, guia de leitura e suporte a TDAH — para que estudantes
              com qualquer necessidade possam aproveitar todo o conteúdo.
            </p>
          </div>
        </section>

        {/* Values */}
        <section aria-label="Nossos valores">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Nossos Valores</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
            {values.map((value) => (
              <li key={value.title}>
                <article className="bg-white rounded-lg border border-gray-200 p-5 flex gap-4 h-full">
                  <span className="text-3xl" aria-hidden="true">{value.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Accessibility statement */}
        <section aria-label="Declaração de acessibilidade">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Declaração de Acessibilidade
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              O Portal Igarapé está comprometido em garantir a acessibilidade digital
              para pessoas com deficiência. Buscamos estar em conformidade com
              as{" "}
              <strong className="text-gray-900">
                Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1,
                nível AA
              </strong>.
            </p>
            <p>Entre as práticas adotadas:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Link de pular para o conteúdo principal</li>
              <li>Hierarquia de títulos semântica e consistente</li>
              <li>Contraste de cor mínimo de 4,5:1 para texto normal</li>
              <li>Navegação completa por teclado</li>
              <li>Indicadores de foco visíveis</li>
              <li>Textos alternativos em elementos não textuais</li>
              <li>Atributo <code className="bg-gray-100 px-1 rounded">lang=&quot;pt-BR&quot;</code> na página</li>
              <li>Marcação <code className="bg-gray-100 px-1 rounded">aria-current=&quot;page&quot;</code> no menu ativo</li>
            </ul>
            <p>
              Encontrou algum problema de acessibilidade? Entre em contato
              conosco para nos ajudar a melhorar.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Comece a estudar" className="text-center py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Explore nosso conteúdo gratuito e dê o próximo passo na sua
            jornada de aprendizado.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/artigos"
              className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-colors text-sm"
            >
              Ver Artigos
            </Link>
            <Link
              href="/video-aulas"
              className="inline-block border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-colors text-sm"
            >
              Ver Vídeo Aulas
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
