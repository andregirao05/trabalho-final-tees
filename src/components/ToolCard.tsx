import type { StudyTool } from "@/lib/types";

export function ToolCard({ tool }: { tool: StudyTool }) {
  const hasUrl = tool.url && tool.url !== "#";

  const content = (
    <>
      <div
        className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
        aria-hidden="true"
      >
        {tool.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900">{tool.name}</h3>
          <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            {tool.category}
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{tool.description}</p>
        {hasUrl && (
          <span className="inline-block mt-2 text-xs text-blue-700 font-medium" aria-hidden="true">
            Acessar ferramenta →
          </span>
        )}
      </div>
    </>
  );

  if (hasUrl) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tool.name} — abre em nova aba`}
        className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all flex gap-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-5 flex gap-4">
      {content}
    </article>
  );
}
