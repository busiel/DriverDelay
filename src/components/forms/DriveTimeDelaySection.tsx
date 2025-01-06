import React from 'react';
import type { DelayFormProps } from '../../types/delay';

const DRIVE_TIME_DELAYS = [
  'Accident',
  'Breakdown',
  'Construction',
  'Detour',
  'Lane(s) Closed',
  'Road Closed',
  'Weather'
] as const;

export const DriveTimeDelaySection: React.FC<DelayFormProps> = ({ formData, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Allowed Delays:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DRIVE_TIME_DELAYS.map((delay) => (
          <label key={delay} className="flex items-center space-x-3">
            <input
              type="radio"
              name="driveTimeDelay"
              value={delay}
              checked={formData.delayType === delay}
              onChange={(e) => onChange({ ...formData, delayType: e.target.value })}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{delay}</span>
          </label>
        ))}
      </div>
    </div>
  );
};