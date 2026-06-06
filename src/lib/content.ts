import "server-only";
import fs from "fs";
import path from "path";
import type { Article, Video, StudyTool, VestibularTip } from "./types";

const dir = path.join(process.cwd(), "content");

function read<T>(file: string): T[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as T[];
  } catch {
    return [];
  }
}

export function write<T>(file: string, data: T[]): void {
  fs.writeFileSync(path.join(dir, file), JSON.stringify(data, null, 2), "utf-8");
}

function byDate<T extends { createdAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
  );
}

export const getArticles = (): Article[] => byDate(read("articles.json"));
export const getVideos = (): Video[] => byDate(read("videos.json"));
export const getTools = (): StudyTool[] => byDate(read("tools.json"));
export const getTips = (): VestibularTip[] => byDate(read("tips.json"));

export const getArticleById = (id: string) => getArticles().find((a) => a.id === id);
export const getArticleBySlug = (slug: string) => getArticles().find((a) => a.slug === slug);
export const getVideoById = (id: string) => getVideos().find((v) => v.id === id);
export const getToolById = (id: string) => getTools().find((t) => t.id === id);
export const getTipById = (id: string) => getTips().find((t) => t.id === id);
