export const lazyLoad = <T>(callback: () => Promise<T>): typeof callback => {
  let item: { data: T } | null = null;

  return async (): Promise<T> => {
    item = item ?? { data: await callback() };
    return item.data;
  };
};
