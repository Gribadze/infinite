import data from './data';

export const getItems = async (size: number, page: number) => {
  const start = page * size;
  return data.slice(start, start + size);
};