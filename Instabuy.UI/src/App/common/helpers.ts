export function groupBy<TEntity, TKey>(list: TEntity[], keyGetter: (item: TEntity) => TKey): Map<TKey, TEntity[]> {
  const map = new Map();
  list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
  });
  return map;
}