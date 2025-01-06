export type SatisfactionRating = 'positive' | 'neutral' | 'negative';

export interface SatisfactionData {
  id: string;
  user_id: string;
  delay_id: string;
  rating: SatisfactionRating;
  created_at: string;
}