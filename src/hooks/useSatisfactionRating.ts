import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SatisfactionRating } from '../types/satisfaction';

export function useSatisfactionRating() {
  const [loading, setLoading] = useState(false);

  const submitRating = async (delayId: string, rating: SatisfactionRating) => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('satisfaction_ratings')
        .insert([{
          delay_id: delayId,
          user_id: user.id,
          rating
        }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error submitting rating:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitRating, loading };
}