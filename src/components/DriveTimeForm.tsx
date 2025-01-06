import React from 'react';
import StateSelector from './StateSelector';
import { DateTimeSection } from './forms/DateTimeSection';
import { DriveTimeDelaySection } from './forms/DriveTimeDelaySection';
import { MileMarkerSection } from './forms/MileMarkerSection';
import { DirectionSection } from './forms/DirectionSection';
import type { DelayFormProps } from '../types/delay';

const DriveTimeForm: React.FC<DelayFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <DriveTimeDelaySection formData={formData} onChange={onChange} />
      <DateTimeSection formData={formData} onChange={onChange} />
      <MileMarkerSection formData={formData} onChange={onChange} />

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Highway or Location #*
        </label>
        <input
          type="text"
          required
          value={formData.highway}
          onChange={(e) => onChange({ ...formData, highway: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <DirectionSection formData={formData} onChange={onChange} />
      <StateSelector
        value={formData.state}
        onChange={(value) => onChange({ ...formData, state: value })}
      />
    </div>
  );
};

export default DriveTimeForm;