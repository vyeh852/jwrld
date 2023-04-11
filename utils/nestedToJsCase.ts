/**
 * @param {string} string
 * @return {string}
 */
function snakeToCamel(string: string) {
  const splitStringArr = string.split("_");
  const builtStr = splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc + curr;
  }, "");
  return builtStr;
}

/**
 * @param {T} data
 * @return {T}
 */
export function nestedToJsCase<T>(data: unknown) {
  let returnValue: unknown = data;
  if (Array.isArray(data)) {
    returnValue = data.map(nestedToJsCase);
  } else if (typeof data === "object" && data !== null) {
    returnValue = Object.entries(data).reduce((obj, [key, value]) => {
      const camelKey = snakeToCamel(key);
      obj[camelKey] = nestedToJsCase(value);
      return obj;
    }, {});
  }

  return returnValue as T;
}
