import React from 'react';
import TimeInput from './TimeInput';
import StateSelector from './StateSelector';
import { Calendar } from 'lucide-react';

interface NonDrivingFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const NonDrivingForm: React.FC<NonDrivingFormProps> = ({ formData, onChange }) => {
  const nonDrivingDelays = [
    'Dispatch Assignment Late',
    'Load Late off Door',
    'Invalid Seal',
    'Dolly Fail / Repair',
    'Trailer Fail / Repair',
    'Relay Late',
    'Relay Equipment Fail / Repair',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Delay Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Non-Driving Delay:</h3>
        <div className="space-y-2">
          {nonDrivingDelays.map((delay) => (
            <label key={delay} className="flex items-center space-x-3">
              <input
                type="radio"
                name="nonDrivingDelay"
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

      {/* Date and Time */}
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

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location #*
        </label>
        <input
          type="text"
          required
          value={formData.highway}
          onChange={(e) => onChange({ ...formData, highway: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* State Selector */}
      <StateSelector
        value={formData.state}
        onChange={(value) => onChange({ ...formData, state: value })}
      />
    </div>
  );
};

export default NonDrivingForm;