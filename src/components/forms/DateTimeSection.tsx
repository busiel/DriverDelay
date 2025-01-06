import React from 'react';
import { Calendar } from 'lucide-react';
import TimeInput from '../inputs/TimeInput';
import type { DelayFormProps } from '../../types/delay';

export const DateTimeSection: React.FC<DelayFormProps> = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => onChange({ ...formData, date: e.target.value })}
            className="w-full p-3 border rounded-lg pr-10"
          />
          <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <TimeInput
        label="Start Time"
        value={formData.startTime}
        onChange={(value) => onChange({ ...formData, startTime: value })}
      />
      <TimeInput
        label="End Time"
        value={formData.endTime}
        onChange={(value) => onChange({ ...formData, endTime: value })}
      />
    </div>
  );
};