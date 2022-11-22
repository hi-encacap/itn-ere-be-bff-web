import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = (separator?: string) => {
  const dayPrefix = dayjs().format('YYYYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '').toUpperCase();

  return `${dayPrefix}${separator ?? ''}${uuidPrefix}`;
};

const slugify = (text: string) => {
  let result = text.toLowerCase();

  // xóa dấu
  result = result.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/gu, 'a');
  result = result.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/gu, 'e');
  result = result.replace(/(ì|í|ị|ỉ|ĩ)/gu, 'i');
  result = result.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/gu, 'o');
  result = result.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/gu, 'u');
  result = result.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/gu, 'y');
  result = result.replace(/(đ)/g, 'd');

  result = result.replace(/([^0-9a-z-\s])/g, '');

  result = result.replace(/(\s+)/g, '-');

  result = result.replace(/^-+/g, '');

  result = result.replace(/-+$/g, '');

  return result;
};

export { randomStringPrefix, slugify };
