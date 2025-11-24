export interface PostModel {
  id: string;
  author_name: string;
  author_id: string;

  title: string;
  category: string;
  description: string;

  photo?: File | string;   // 👈 igual que en usuarios (puede ser archivo o ruta)

  date: string;            // "2025-11-23"
  time: string;            // "22:45"

  comments_count: number;
}
