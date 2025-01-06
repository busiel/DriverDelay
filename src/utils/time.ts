export function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  const diffMs = end.getTime() - start.getTime();
  const minutes = Math.floor(diffMs / 60000);
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return hours > 0 
    ? `${hours}:${remainingMinutes.toString().padStart(2, '0')}`
    : `0:${remainingMinutes.toString().padStart(2, '0')}`;
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // Returns HH:mm format
}

export function getDefaultFormTimes() {
  const currentTime = getCurrentTime();
  return {
    startTime: currentTime,
    endTime: currentTime
  };
}

export function formatTimeAMPM(time: string): string {
  const date = new Date(`2000-01-01T${time}`);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}