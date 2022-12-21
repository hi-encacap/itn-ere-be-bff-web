import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = (length = 14) => {
  const dayPrefix = dayjs().format('YYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '').toUpperCase();
  const resultLength = length;

  return `${dayPrefix}${uuidPrefix}`.slice(0, resultLength);
};

const slugify = (text: string) => {
  let result = text.toLowerCase();

  result = result.replace(/(?<id>à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/gu, 'a');
  result = result.replace(/(?<id>è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/gu, 'e');
  result = result.replace(/(?<id>ì|í|ị|ỉ|ĩ)/gu, 'i');
  result = result.replace(/(?<id>ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/gu, 'o');
  result = result.replace(/(?<id>ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/gu, 'u');
  result = result.replace(/(?<id>ỳ|ý|ỵ|ỷ|ỹ)/gu, 'y');
  result = result.replace(/(?<id>đ)/gu, 'd');

  result = result.replace(/(?<id>[^0-9a-z-\s])/g, '');

  result = result.replace(/(?<id>\s+)/g, '-');

  result = result.replace(/^-+/g, '');

  result = result.replace(/-+$/g, '');

  return result;
};

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomAlphabet = (stringLength: number) =>
  [...Array(stringLength).keys()].reduce((cur) => cur + String.fromCharCode(random(65, 90)), '');

export { randomStringPrefix, slugify, randomAlphabet };
