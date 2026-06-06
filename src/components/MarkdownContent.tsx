"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-gray-800 leading-relaxed mb-4">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 mb-4 text-gray-800">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-800">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-700 pl-4 italic text-gray-600 my-4">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith("language-");
          return isBlock ? (
            <code className="block bg-gray-100 rounded-md p-4 text-sm font-mono text-gray-800 overflow-x-auto mb-4 whitespace-pre">
              {children}
            </code>
          ) : (
            <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="mb-4">{children}</pre>,
        img: ({ src, alt, title }) => (
          <span className="block my-6">
            <img
              src={src}
              alt={alt ?? ""}
              className="rounded-lg max-w-full mx-auto shadow-sm"
            />
            {(title ?? alt) && (
              <span className="block text-center text-sm text-gray-500 mt-2">
                {title ?? alt}
              </span>
            )}
          </span>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-sm"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="border-gray-200 my-8" />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-200 rounded-lg text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-200 px-4 py-2 text-gray-800">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
