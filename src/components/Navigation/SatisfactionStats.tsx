import React from 'react';
import { ThumbsUp, Hand, ThumbsDown } from 'lucide-react';
import { useSatisfactionStats } from '../../hooks/useSatisfactionStats';

export const SatisfactionStats: React.FC = () => {
  const { stats, loading } = useSatisfactionStats();

  if (loading || !stats) return null;

  const ratings = [
    { count: stats.positive, icon: ThumbsUp, label: 'Satisfied', color: 'text-green-500' },
    { count: stats.neutral, icon: Hand, label: 'Neutral', color: 'text-gray-500' },
    { count: stats.negative, icon: ThumbsDown, label: 'Dissatisfied', color: 'text-red-500' }
  ];

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Feedback Overview</h3>
      <div className="space-y-2">
        {ratings.map(({ count, icon: Icon, label, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            <span className="text-sm font-medium">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};