/**
 * Merges two arrays of objects into a single array.
 *
 * @param a - The first array of objects.
 * @param b - The second array of objects.
 * @returns The merged array of objects.
 */
export const meargeObject = (a: object[], b: object[]) => {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Flattens an array to a specified depth.
 *
 * @param array - The array to flatten.
 * @param result - The resulting flattened array.
 * @param depth - The depth to flatten the array to.
 * @returns The flattened array.
 */
export const flattenWithDepth = (array: [], result: [], depth: number) => {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];

    if (depth > 0 && Array.isArray(value)) {
      flattenWithDepth(value, result, depth - 1);
    } else {
      result.push(value);
    }
  }

  return result;
};

/**
 * Recursively flattens an array to a single level.
 *
 * @param array - The array to flatten.
 * @param result - The resulting flattened array.
 * @returns The flattened array.
 */
export const flattenForever = (array: [], result: []) => {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];

    if (Array.isArray(value)) {
      flattenForever(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
};

/**
 * Flattens a nested array to a specified depth.
 *
 * @param array - The array to flatten.
 * @param depth - The depth to flatten the array to. If not provided, the array will be flattened to an infinite depth.
 * @returns The flattened array.
 */
export const arrayFlatten = (array: [], depth: number) => {
  if (depth == null) {
    return flattenForever(array, []);
  }

  return flattenWithDepth(array, [], depth);
};
