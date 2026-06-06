import type { StudyTool } from "@/lib/types";

interface ToolCardProps {
  tool: StudyTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all flex gap-4">
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
      </div>
    </article>
  );
}
