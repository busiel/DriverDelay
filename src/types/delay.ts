export type DelayFormData = {
  eventType: 'drive' | 'non-drive';
  delayType?: string;
  date: string;
  startTime: string;
  endTime: string;
  startMileMarker?: string;
  endMileMarker?: string;
  highway: string;
  direction?: 'N' | 'S' | 'E' | 'W';
  state: string;
  notes: string;
}

export type DelayFormProps = {
  formData: DelayFormData;
  onChange: (data: DelayFormData) => void;
}