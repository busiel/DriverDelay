import React from 'react';
import { Clock, MapPin, Navigation, CalendarDays, Timer, FileText, PenSquare } from 'lucide-react';
import type { DelayFormData } from '../types/delay';
import { formatDuration, formatTimeAMPM } from '../utils/time';
import { SatisfactionRating } from './SatisfactionRating/SatisfactionRating';

interface DelayDetailProps {
  delay: DelayFormData;
  onEdit?: () => void;
}

const DetailItem: React.FC<{
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string;
  valueClassName?: string;
}> = ({ 
  icon: Icon, 
  label, 
  value,
  valueClassName = "text-gray-800 text-lg"
}) => (
  <div className="flex items-start space-x-3">
    <Icon className="w-5 h-5 text-gray-400 mt-1" />
    <div>
      <div className="text-gray-600">{label}:</div>
      <div className={valueClassName}>{value}</div>
    </div>
  </div>
);

export default function DelayDetail({ delay, onEdit }: DelayDetailProps) {
  const duration = formatDuration(delay.startTime, delay.endTime);
  const formattedStartTime = formatTimeAMPM(delay.startTime);
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-end">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-navy-700 hover:text-navy-800 transition-colors"
            title="Edit delay"
          >
            <PenSquare className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-6xl font-light text-[#29ABE2] mb-4">
            {new Date(delay.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </h2>
          <div className="text-xl text-gray-600">Unplanned Event:</div>
          <h1 className="text-3xl text-[#29ABE2] font-medium">
            {delay.eventType === 'drive' ? 'Drive Time Delay' : 'Non-Driving Delay'}
          </h1>
        </div>

        <DetailItem
          icon={Timer}
          label="Duration"
          value={duration}
          valueClassName="text-[#FF5733] text-2xl font-medium"
        />

        <DetailItem
          icon={CalendarDays}
          label="Date"
          value={new Date(delay.date).toLocaleDateString()}
        />

        <DetailItem
          icon={FileText}
          label="Allowed Delays"
          value={delay.delayType || 'N/A'}
        />

        <DetailItem
          icon={Clock}
          label="Start Time"
          value={formattedStartTime}
        />

        {delay.startMileMarker && (
          <DetailItem
            icon={MapPin}
            label="Start Mile Marker"
            value={delay.startMileMarker}
          />
        )}

        <DetailItem
          icon={MapPin}
          label="Highway or Location #"
          value={delay.highway}
        />

        {delay.direction && (
          <DetailItem
            icon={Navigation}
            label="Direction"
            value={delay.direction}
          />
        )}

        <DetailItem
          icon={MapPin}
          label="State"
          value={delay.state}
        />

        <DetailItem
          icon={Clock}
          label="End Time"
          value={new Date(`2000-01-01T${delay.endTime}`).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        />

        {delay.notes && (
          <div className="pt-4 border-t">
            <h3 className="text-gray-600 mb-2">Note:</h3>
            <p className="text-gray-800">{delay.notes}</p>
          </div>
        )}

        {delay.eventType === 'drive' && (
          <div className="pt-4 border-t">
            <h3 className="text-gray-600 mb-2">Enter in ELD as Remarks:</h3>
            <p className="text-[#FF5733]">
              {`${formattedStartTime}, ${delay.highway}${delay.direction}/${delay.state}, mm: ${delay.startMileMarker}-, ${delay.delayType} +${duration}`}
            </p>
          </div>
        )}

        {delay.id && <SatisfactionRating delayId={delay.id} />}
      </div>
    </div>
  );
}