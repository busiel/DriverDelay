import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SatisfactionStats {
  positive: number;
  neutral: number;
  negative: number;
}

export function useSatisfactionStats() {
  const [stats, setStats] = useState<SatisfactionStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('satisfaction_ratings')
          .select('rating')
          .eq('user_id', user.id);

        if (error) throw error;

        const stats = data.reduce((acc, { rating }) => {
          acc[rating]++;
          return acc;
        }, { positive: 0, neutral: 0, negative: 0 });

        setStats(stats);
      } catch (error) {
        console.error('Error fetching satisfaction stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}