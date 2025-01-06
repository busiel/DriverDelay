import React from 'react';
import type { DelayFormProps } from '../../types/delay';

const DIRECTIONS = ['N', 'S', 'E', 'W'] as const;

export const DirectionSection: React.FC<DelayFormProps> = ({ formData, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Direction
      </label>
      <div className="grid grid-cols-4 gap-3">
        {DIRECTIONS.map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => onChange({ ...formData, direction: dir })}
            className={`p-3 border rounded-lg ${
              formData.direction === dir
                ? 'bg-navy-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {dir}
          </button>
        ))}
      </div>
    </div>
  );
};