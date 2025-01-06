import React from 'react';
import { DelayListItem } from './DelayListItem';
import type { DelayFormData } from '../../types/delay';

interface DelayListProps {
  delays: DelayFormData[];
  loading?: boolean;
  error?: string | null;
  onSelectDelay: (delay: DelayFormData) => void;
}

export const DelayList: React.FC<DelayListProps> = ({ 
  delays, 
  loading, 
  error, 
  onSelectDelay 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        Loading delays...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (delays.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No delays found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Day</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Duration</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Unplanned Event</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Delay Type</th>
          </tr>
        </thead>
        <tbody>
          {delays.map((delay, index) => (
            <DelayListItem 
              key={index} 
              delay={delay} 
              onClick={() => onSelectDelay(delay)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};