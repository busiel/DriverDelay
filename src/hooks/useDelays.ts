import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DelayFormData } from '../types/delay';

export function useDelays() {
  const [delays, setDelays] = useState<DelayFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDelays();
  }, []);

  async function fetchDelays() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('delays')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setDelays(data.map(delay => ({
        eventType: delay.event_type,
        delayType: delay.delay_type,
        date: delay.date,
        startTime: delay.start_time,
        endTime: delay.end_time,
        startMileMarker: delay.start_mile_marker,
        endMileMarker: delay.end_mile_marker,
        highway: delay.highway,
        direction: delay.direction,
        state: delay.state,
        notes: delay.notes
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return { delays, loading, error, refetch: fetchDelays };
}