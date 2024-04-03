import { access, constants } from "fs/promises";
/**
 * Checks if a file or directory exists and is readable.
 *
 * @param target - The path to the file or directory to check.
 * @returns A promise that resolves to a boolean indicating if the target exists and is readable.
 * @example
 * const filePath = "path/to/file";
 * const exists = await exist(filePath);
 */
export const exist = async (target: any): Promise<boolean> => {
  try {
    await access(target, constants.F_OK | constants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
};
