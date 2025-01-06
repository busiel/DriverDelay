import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { states } from '../utils/states';

interface StateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStates = states.filter(state => 
    state.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedState = states.find(state => state.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        State*
      </label>
      <button
        type="button"
        className="w-full p-3 border rounded-lg text-left bg-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedState ? selectedState.label : 'Select a state'}</span>
        <span className="border-l pl-2">
          {value}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-9 pr-3 py-2 border rounded-md"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredStates.map((state) => (
              <button
                key={state.value}
                type="button"
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center ${
                  value === state.value ? 'bg-blue-50 text-blue-700' : ''
                }`}
                onClick={() => {
                  onChange(state.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <span>{state.label}</span>
                <span className="text-gray-400">{state.value}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateSelector;