export interface ReviewModel {
  id?: string;
  item_id: string;
  item_type: string;
  rating: number;
  comentario: string;
  user_id: string;

  user_name: string;   // 👈 nuevo
  user_type: string;   // 👈 nuevo
}
