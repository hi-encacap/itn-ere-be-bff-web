import dayjs from 'dayjs';
import { v5 as uuidv5 } from 'uuid';

const randomStringPrefix = (length = 27) => {
  const dayPrefix = dayjs().format('YYYYMMDD');
  const uuidPrefix = uuidv5(dayPrefix, uuidv5.URL)
    .slice(0, length - dayPrefix.length)
    .replace(/-/g, '');

  return `${dayPrefix}${uuidPrefix}`;
};

export { randomStringPrefix };
