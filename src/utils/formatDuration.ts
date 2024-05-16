import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatDuration = (duration, format = 'HH:mm:ss') => dayjs.duration(duration).format(format);
