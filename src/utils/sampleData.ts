import { DelayFormData } from '../types/delay';

export const sampleDelays: DelayFormData[] = [
  {
    eventType: 'drive',
    delayType: 'Accident',
    date: '2024-01-04',
    startTime: '10:08',
    endTime: '10:35',
    startMileMarker: '77.0',
    highway: 'I77',
    direction: 'N',
    state: 'NC',
    notes: 'Single car accident hit the guard rail down to one lane car parked in the Travel lanes'
  },
  {
    eventType: 'drive',
    delayType: 'Weather',
    date: '2024-01-03',
    startTime: '08:15',
    endTime: '08:43',
    startMileMarker: '122.5',
    highway: 'I95',
    direction: 'S',
    state: 'VA',
    notes: 'Heavy snow reducing visibility, traffic moving slowly'
  },
  {
    eventType: 'non-drive',
    delayType: 'Dispatch Assignment Late',
    date: '2024-01-02',
    startTime: '14:30',
    endTime: '15:31',
    highway: 'Terminal 156',
    state: 'OH',
    notes: 'Waiting for dispatch to provide next assignment details'
  }
];