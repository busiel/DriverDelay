import React from 'react';
import type { DelayFormProps } from '../../types/delay';

export const MileMarkerSection: React.FC<DelayFormProps> = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Mile Marker
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={formData.startMileMarker || ''}
          onChange={(e) => onChange({ ...formData, startMileMarker: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Mile Marker
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={formData.endMileMarker || ''}
          onChange={(e) => onChange({ ...formData, endMileMarker: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />
      </div>
    </div>
  );
};