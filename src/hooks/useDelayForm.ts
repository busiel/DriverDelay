import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DelayFormData } from '../types/delay';

export function useDelayForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDelay = async (formData: DelayFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!formData.date || !formData.startTime || !formData.endTime || !formData.highway || !formData.state) {
        throw new Error('Please fill in all required fields');
      }

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to submit delays');
      }

      const delayData = {
        user_id: user.id,
        event_type: formData.eventType,
        delay_type: formData.delayType,
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        start_mile_marker: formData.startMileMarker || null,
        end_mile_marker: formData.endMileMarker || null,
        highway: formData.highway,
        direction: formData.direction || null,
        state: formData.state,
        notes: formData.notes || null
      };

      console.log('Submitting delay data:', delayData);

      const { data, error: submitError } = await supabase
        .from('delays')
        .insert([delayData])
        .select();

      if (submitError) {
        console.error('Supabase error:', submitError);
        throw submitError;
      }

      console.log('Successfully submitted delay:', data);
      return true;
    } catch (err) {
      console.error('Error submitting delay:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the delay');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitDelay, loading, error };
}