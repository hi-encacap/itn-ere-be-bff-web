import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = (separator?: string) => {
  const dayPrefix = dayjs().format('YYYYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '').toUpperCase();

  return `${dayPrefix}${separator ?? ''}${uuidPrefix}`;
};

export { randomStringPrefix };
