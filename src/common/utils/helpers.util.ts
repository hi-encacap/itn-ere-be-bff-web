import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const randomStringPrefix = (separator?: string) => {
  const dayPrefix = dayjs().format('YYYYMMDD');
  const uuidPrefix = uuidv4().replace(/-/g, '').toUpperCase();

  return `${dayPrefix}${separator ?? ''}${uuidPrefix}`;
};

const slugify = (text: string) => {
  let result = text.toLowerCase();

  result = result.replace(/(?<id>à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  result = result.replace(/(?<id>è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  result = result.replace(/(?<id>ì|í|ị|ỉ|ĩ)/g, 'i');
  result = result.replace(/(?<id>ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  result = result.replace(/(?<id>ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  result = result.replace(/(?<id>ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  result = result.replace(/(?<id>đ)/g, 'd');

  result = result.replace(/(?<id>[^0-9a-z-\s])/g, '');

  result = result.replace(/(?<id>\s+)/g, '-');

  result = result.replace(/^-+/g, '');

  result = result.replace(/-+$/g, '');

  return result;
};

export { randomStringPrefix, slugify };
