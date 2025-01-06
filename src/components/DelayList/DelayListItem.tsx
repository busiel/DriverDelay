import React from 'react';
import { formatDate, getDayName } from '../../utils/date';
import { formatDuration } from '../../utils/time';
import type { DelayFormData } from '../../types/delay';

interface DelayListItemProps {
  delay: DelayFormData;
  onClick: () => void;
}

export const DelayListItem: React.FC<DelayListItemProps> = ({ delay, onClick }) => {
  const duration = delay.endTime && delay.startTime 
    ? formatDuration(delay.startTime, delay.endTime)
    : '';

  return (
    <tr 
      className="border-b hover:bg-gray-50 cursor-pointer" 
      onClick={onClick}
    >
      <td className="py-3 px-4">
        <div>{getDayName(delay.date)}</div>
        <div className="text-sm text-gray-500">{formatDate(delay.date)}</div>
      </td>
      <td className="py-3 px-4 text-orange-600 font-medium">{duration}</td>
      <td className="py-3 px-4 text-blue-600">{
        delay.eventType === 'drive' ? 'Drive Time Delay' : 'Non-Driving Delay'
      }</td>
      <td className="py-3 px-4">{delay.delayType}</td>
    </tr>
  );
};