import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = (length?: number) => {
  const dayPrefix = dayjs().format('YYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '').toUpperCase();
  const resultLength = length;
  const result = `${dayPrefix}${uuidPrefix}`;

  if (!resultLength) {
    return result;
  }

  return `${dayPrefix}${uuidPrefix}`.slice(0, resultLength);
};

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomAlphabet = (stringLength: number) =>
  [...Array(stringLength).keys()].reduce((cur) => cur + String.fromCharCode(random(65, 90)), '');

export { randomAlphabet, randomStringPrefix };
