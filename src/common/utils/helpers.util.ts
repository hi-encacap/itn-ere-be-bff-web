import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = () => {
  const dayPrefix = dayjs().format('YYYYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '');

  return `${dayPrefix}${uuidPrefix}`;
};

export { randomStringPrefix };
