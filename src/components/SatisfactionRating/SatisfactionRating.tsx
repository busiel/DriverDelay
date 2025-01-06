import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSatisfactionRating } from '../../hooks/useSatisfactionRating';
import type { SatisfactionRating as Rating } from '../../types/satisfaction';

interface Props {
  delayId: string;
}

export const SatisfactionRating: React.FC<Props> = ({ delayId }) => {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const { user } = useAuth();
  const { submitRating, loading } = useSatisfactionRating();

  const handleRating = async (rating: Rating) => {
    if (!user || loading) return;
    
    const success = await submitRating(delayId, rating);
    if (success) {
      setSelectedRating(rating);
    }
  };

  const ratingOptions = [
    { value: 'positive' as Rating, emoji: '👍', label: 'Satisfied' },
    { value: 'neutral' as Rating, emoji: '✋', label: 'Neutral' },
    { value: 'negative' as Rating, emoji: '👎', label: 'Dissatisfied' }
  ];

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      <span className="text-sm text-gray-500">Was this helpful?</span>
      <div className="flex gap-2">
        {ratingOptions.map(({ value, emoji, label }) => (
          <button
            key={value}
            onClick={() => handleRating(value)}
            disabled={loading || selectedRating !== null}
            className={`p-2 rounded-full transition-all ${
              selectedRating === value
                ? 'bg-blue-50 scale-110'
                : 'hover:bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={label}
          >
            <span className="text-lg">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
};