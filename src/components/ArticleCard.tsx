import Link from "next/link";
import { CategoryBadge } from "./CategoryBadge";
import { SUBJECTS } from "@/lib/data";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  const subject = SUBJECTS[article.subject];

  return (
    <article className="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt=""
          className="h-40 w-full object-cover"
        />
      ) : (
        <div
          className={`h-2 w-full ${subject.badge.split(" ")[0]}`}
          aria-hidden="true"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryBadge subject={article.subject} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
          <Link
            href={`/artigos/${article.slug}`}
            className="hover:text-blue-700 focus:outline-none focus:underline focus:text-blue-700 after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">{article.excerpt}</p>
        <footer className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{article.author}</span>
          <span>
            <time dateTime={article.date}>{article.date}</time>
            {" · "}
            <span>{article.readTime} min de leitura</span>
          </span>
        </footer>
      </div>
    </article>
  );
}
