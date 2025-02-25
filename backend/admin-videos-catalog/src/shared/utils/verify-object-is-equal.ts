export function isEqual<T>(obj1: T, obj2: T, visited = new Set<object>()): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" || obj1 === null ||
    typeof obj2 !== "object" || obj2 === null
  ) {
    return false;
  }

  // Handle circular references
  if (visited.has(obj1) || visited.has(obj2)) {
    return true;
  }
  visited.add(obj1);
  visited.add(obj2);

  // Check if both are arrays
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((el, index) => isEqual(el, obj2[index], visited));
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key], visited)) {
      return false;
    }
  }

  return true;
}
