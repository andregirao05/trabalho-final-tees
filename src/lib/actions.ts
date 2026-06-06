"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getArticles, getVideos, getTools, getTips, write } from "./content";
import type { Subject } from "./types";

function newId(): string {
  return crypto.randomUUID();
}

function extractYoutubeId(input: string): string | undefined {
  const s = input.trim();
  if (!s) return undefined;
  // already a bare ID (no slashes or dots)
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  try {
    const url = new URL(s);
    if (url.hostname === "youtu.be") return url.pathname.slice(1) || undefined;
    return url.searchParams.get("v") ?? undefined;
  } catch {
    return undefined;
  }
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function today(): string {
  return new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ---- Articles ----

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const articles = getArticles();
  const imageUrl = (formData.get("imageUrl") as string) || undefined;
  const content = (formData.get("content") as string) || undefined;
  articles.push({
    id: newId(),
    title,
    excerpt: formData.get("excerpt") as string,
    subject: formData.get("subject") as Subject,
    author: formData.get("author") as string,
    date: today(),
    readTime: Number(formData.get("readTime")) || 5,
    slug: toSlug(title),
    featured: formData.get("featured") === "on",
    createdAt: new Date().toISOString(),
    ...(imageUrl ? { imageUrl } : {}),
    ...(content ? { content } : {}),
  });
  write("articles.json", articles);
  revalidatePath("/");
  revalidatePath("/artigos");
  redirect("/admin/artigos");
}

export async function updateArticle(formData: FormData) {
  const id = formData.get("id") as string;
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx !== -1) {
    const title = formData.get("title") as string;
    const imageUrl = (formData.get("imageUrl") as string) || undefined;
    const content = (formData.get("content") as string) || undefined;
    articles[idx] = {
      ...articles[idx],
      title,
      excerpt: formData.get("excerpt") as string,
      subject: formData.get("subject") as Subject,
      author: formData.get("author") as string,
      readTime: Number(formData.get("readTime")) || articles[idx].readTime,
      featured: formData.get("featured") === "on",
      slug: toSlug(title),
      imageUrl: imageUrl ?? articles[idx].imageUrl,
      content: content ?? articles[idx].content,
    };
    write("articles.json", articles);
    revalidatePath("/");
    revalidatePath("/artigos");
  }
  redirect("/admin/artigos");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id") as string;
  write("articles.json", getArticles().filter((a) => a.id !== id));
  revalidatePath("/");
  revalidatePath("/artigos");
}

// ---- Videos ----

export async function createVideo(formData: FormData) {
  const videos = getVideos();
  const youtubeId = extractYoutubeId(formData.get("youtubeUrl") as string);
  const description = (formData.get("description") as string) || undefined;
  videos.push({
    id: newId(),
    title: formData.get("title") as string,
    subject: formData.get("subject") as Subject,
    teacher: formData.get("teacher") as string,
    duration: formData.get("duration") as string,
    views: "0",
    createdAt: new Date().toISOString(),
    ...(youtubeId ? { youtubeId } : {}),
    ...(description ? { description } : {}),
  });
  write("videos.json", videos);
  revalidatePath("/");
  revalidatePath("/video-aulas");
  redirect("/admin/videos");
}

export async function updateVideo(formData: FormData) {
  const id = formData.get("id") as string;
  const videos = getVideos();
  const idx = videos.findIndex((v) => v.id === id);
  if (idx !== -1) {
    const youtubeId = extractYoutubeId(formData.get("youtubeUrl") as string);
    const description = (formData.get("description") as string) || undefined;
    videos[idx] = {
      ...videos[idx],
      title: formData.get("title") as string,
      subject: formData.get("subject") as Subject,
      teacher: formData.get("teacher") as string,
      duration: formData.get("duration") as string,
      youtubeId: youtubeId ?? videos[idx].youtubeId,
      description: description ?? videos[idx].description,
    };
    write("videos.json", videos);
    revalidatePath("/");
    revalidatePath("/video-aulas");
  }
  redirect("/admin/videos");
}

export async function deleteVideo(formData: FormData) {
  const id = formData.get("id") as string;
  write("videos.json", getVideos().filter((v) => v.id !== id));
  revalidatePath("/");
  revalidatePath("/video-aulas");
}

// ---- Tips ----

export async function createTip(formData: FormData) {
  const tips = getTips();
  tips.push({
    id: newId(),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    icon: (formData.get("icon") as string) || "💡",
    createdAt: new Date().toISOString(),
  });
  write("tips.json", tips);
  revalidatePath("/");
  revalidatePath("/vestibular");
  redirect("/admin/dicas");
}

export async function updateTip(formData: FormData) {
  const id = formData.get("id") as string;
  const tips = getTips();
  const idx = tips.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tips[idx] = {
      ...tips[idx],
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      icon: (formData.get("icon") as string) || tips[idx].icon,
    };
    write("tips.json", tips);
    revalidatePath("/");
    revalidatePath("/vestibular");
  }
  redirect("/admin/dicas");
}

export async function deleteTip(formData: FormData) {
  const id = formData.get("id") as string;
  write("tips.json", getTips().filter((t) => t.id !== id));
  revalidatePath("/");
  revalidatePath("/vestibular");
}

// ---- Tools ----

export async function createTool(formData: FormData) {
  const tools = getTools();
  tools.push({
    id: newId(),
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon: (formData.get("icon") as string) || "🔧",
    category: formData.get("category") as string,
    url: (formData.get("url") as string) || "#",
    createdAt: new Date().toISOString(),
  });
  write("tools.json", tools);
  revalidatePath("/");
  revalidatePath("/ferramentas");
  redirect("/admin/ferramentas");
}

export async function updateTool(formData: FormData) {
  const id = formData.get("id") as string;
  const tools = getTools();
  const idx = tools.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tools[idx] = {
      ...tools[idx],
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      icon: (formData.get("icon") as string) || tools[idx].icon,
      category: formData.get("category") as string,
      url: (formData.get("url") as string) || "#",
    };
    write("tools.json", tools);
    revalidatePath("/");
    revalidatePath("/ferramentas");
  }
  redirect("/admin/ferramentas");
}

export async function deleteTool(formData: FormData) {
  const id = formData.get("id") as string;
  write("tools.json", getTools().filter((t) => t.id !== id));
  revalidatePath("/");
  revalidatePath("/ferramentas");
}
