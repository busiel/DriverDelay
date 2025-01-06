import React from 'react';

interface MileMarkerInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const MileMarkerInput: React.FC<MileMarkerInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
}

export default MileMarkerInput;