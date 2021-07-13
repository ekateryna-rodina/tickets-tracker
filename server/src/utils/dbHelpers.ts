function composeUpdateQuery<T extends object>(
  tableName: string,
  map: T,
  entityId: number
): string {
  let keys = Object.keys(map);
  let query = [`UPDATE ${tableName} SET `];
  keys.forEach(function (k: string) {
    query.push(`${k}=${map[k as keyof T]}`);
  });

  query = [query.join(", ")];
  query.push(`WHERE ${tableName}_id = ${entityId}`);
  return query.join(" ");
}

export { composeUpdateQuery };
