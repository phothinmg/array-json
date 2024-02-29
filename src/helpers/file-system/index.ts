import {
  access,
  constants,
  mkdir,
  open,
  unlink,
  rename,
  cp,
} from "fs/promises";
import * as fs from "node:fs";
import path from "node:path";

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

/**
 * Creates a new file at the specified file path.
 *
 * @param {string} filePath - The path where the file should be created.
 * @returns {Promise<void>} - A promise that resolves when the file is successfully created.
 * @example
 * const filePath = "path/to/file";
 * await createFile(filePath);
 */
export const createFile = async (filePath: string): Promise<void> => {
  const exit = await exist(filePath);
  if (exit) {
    console.log(`The file ${filePath} already exit`);
    return;
  } else {
    const newFile = await open(filePath, "w");
    console.log(`${filePath} was successfully created`);
    newFile.close();
  }
};

/**
 * Deletes a file at the specified file path.
 *
 * @param {string} filePath - The path of the file to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the file is successfully deleted.
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  const exit = await exist(filePath);
  if (!exit) {
    console.log(`${filePath} not found`);
    return;
  }
  try {
    await unlink(filePath);
    console.log(`Delete ${filePath} successfully.`);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Renames a file from the old path to the new path.
 *
 * @param {string} oldPath - The path of the file to be renamed.
 * @param {string} newPath - The new path for the renamed file.
 * @returns {Promise<void>} - A promise that resolves when the file is renamed successfully.
 */
export const renameFile = async (
  oldPath: string,
  newPath: string
): Promise<void> => {
  const exit = await exist(oldPath);
  if (!exit) {
    console.log(`${oldPath} not found`);
    return;
  }
  try {
    await rename(oldPath, newPath);
    console.log(`Rename ${oldPath} to ${newPath} successfully.`);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Creates a directory at the specified path.
 *
 * @param {any} dirPath - The path of the directory to be created.
 * @returns {Promise<void>} - A promise that resolves when the directory is successfully created.
 * @throws {Error} - If there is an error creating the directory.
 */
export const makeDir = async (dirPath: any): Promise<void> => {
  const dirName = path.dirname(dirPath);
  await mkdir(dirName, { recursive: true });
};

/**
 * Recursively clears a directory by deleting all its files and subdirectories.
 *
 * @param {string} directoryPath - The path of the directory to be cleared.
 * @param {boolean} [notFirstCall=false] - Indicates whether the function is being called recursively.
 * @returns {void}
 */
export const clearDirectory = (
  directoryPath: string,
  notFirstCall: boolean = false
): void => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        clearDirectory(curPath, true);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    if (notFirstCall) {
      try {
        fs.rmdirSync(directoryPath);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

/**
 * Copies a file or directory from the source path to the destination path.
 *
 * @param src - The source path of the file or directory to be copied.
 * @param dest - The destination path where the file or directory will be copied to.
 * @returns A Promise that resolves when the copy operation is completed.
 * @throws If an error occurs during the copy operation.
 */
export const copy = async (src: string, dest: string) => {
  try {
    await cp(src, dest, { recursive: true });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Checks if the given path is a directory.
 *
 * @param path - The path to check.
 * @returns True if the path is a directory, false otherwise.
 */
export const isDir = (path: string) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch {
    return false;
  }
};
/**
 * Checks if the given path is a file.
 *
 * @param path - The path to check.
 * @returns True if the path is a file, false otherwise.
 */
export const isFile = (path: string) => {
  try {
    const stat = fs.lstatSync(path);
    return stat.isFile();
  } catch {
    return false;
  }
};

/**
 * Deletes a file at the specified path.
 *
 * @param path - The path of the file to be deleted.
 * @returns A promise that resolves when the file is successfully deleted.
 * @throws If an error occurs while deleting the file.
 */
export const unLink = async (path: string) => {
  try {
    await unlink(path);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Watches the specified directories for changes.
 *
 * @param dir - An array of directory paths to watch.
 * @returns void
 */
export const watch = (dir: string[]) => {
  dir.forEach((di) => {
    const watcher = fs.watch(di, { recursive: true });

    watcher.on("change", (event, filePath) => {
      console.log(`${filePath} has been changed`);
    });

    watcher.on("error", (err) => {
      console.log(err);
    });
  });
};
