import React from 'react';

interface EventTypeSelectorProps {
  eventType: 'drive' | 'non-drive';
  onChange: (type: 'drive' | 'non-drive') => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ eventType, onChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        type="button"
        className={`flex-1 py-3 px-4 rounded-lg font-medium ${
          eventType === 'drive'
            ? 'bg-navy-700 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
        onClick={() => onChange('drive')}
      >
        Drive Time Delay
      </button>
      <button
        type="button"
        className={`flex-1 py-3 px-4 rounded-lg font-medium ${
          eventType === 'non-drive'
            ? 'bg-navy-700 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
        onClick={() => onChange('non-drive')}
      >
        Non-Driving Delay
      </button>
    </div>
  );
};

export default EventTypeSelector;