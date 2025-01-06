import { getCurrentTime } from './time';
import type { DelayFormData } from '../types/delay';

export function getDefaultFormData(): DelayFormData {
  const currentTime = getCurrentTime();
  
  return {
    eventType: 'drive',
    date: new Date().toISOString().split('T')[0],
    startTime: currentTime,
    endTime: currentTime,
    highway: '',
    state: '',
    notes: '',
  };
}