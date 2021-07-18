function composeUpdateQuery<T extends object>(
  tableName: string,
  map: T,
  entityId: number
): string {
  let keys = Object.keys(map);
  let propsList: string[] = [];
  keys.forEach(function (k: string) {
    propsList.push(`${k} = "${map[k as keyof T]}"`);
  });

  const resultQuery = `UPDATE ${tableName} SET ${propsList.join(
    ", "
  )} WHERE ${tableName}_id = ${entityId} RETURNING *;`;
  console.log(resultQuery);
  return resultQuery;
}
// TODO type control!
function dbEntityToObject<T extends object>(entity: { [key: string]: any }) {
  let obj: { [key: string]: any } = {} as T;
  let key: string;
  for (let k of Object.keys(entity)) {
    let split = k.split("_");
    if (split.length > 1) {
      key = split[0] + split[1].charAt(0).toUpperCase() + split[1].slice(1);
    } else {
      key = k;
    }
    obj[key] = entity[k];
  }

  return obj as T;
}

export { composeUpdateQuery, dbEntityToObject };
