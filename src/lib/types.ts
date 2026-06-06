export type Subject =
  | "matematica"
  | "portugues"
  | "historia"
  | "geografia"
  | "biologia"
  | "quimica"
  | "fisica"
  | "literatura"
  | "filosofia"
  | "sociologia";

export interface SubjectInfo {
  label: string;
  badge: string;
  bg: string;
  text: string;
  border: string;
  emoji: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  subject: Subject;
  author: string;
  date: string;
  readTime: number;
  slug: string;
  featured?: boolean;
  imageUrl?: string;
  content?: string;
}

export interface Video {
  id: string;
  title: string;
  subject: Subject;
  duration: string;
  teacher: string;
  views: string;
}

export interface StudyTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string;
}

export interface VestibularTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}
