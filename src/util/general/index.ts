import { promisify } from "node:util";

/**
 * Suspends the execution of the current async function for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified number of milliseconds.
 */
export const sleep = async (ms: number) => {
  const slp = promisify(setTimeout);
  await slp(ms);
};
