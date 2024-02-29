/* 
Utility functions of Node.js to support something.

Copyright (c) 2024 Pho Thin Maung
*/

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
import { Buffer } from "node:buffer";
import zlib from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import path from "node:path";
import { createHmac, createHash } from "crypto";

/**
 * Checks if a file or directory exists and is readable.
 *
 * @param target - The path to the file or directory to check.
 * @returns A promise that resolves to a boolean indicating if the target exists and is readable.
 */
export const exist = async (target: any): Promise<boolean> => {
  try {
    await access(target, constants.F_OK | constants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
};
// =========================================================================///
/**
 * Encodes a given text string into hexadecimal format.
 *
 * @param text - The text string to be encoded.
 * @returns The encoded text string in hexadecimal format.
 */
export const encodeHex = (text: string) => {
  return Buffer.from(text).toString("hex");
};

/**
 * Decodes a hexadecimal string into its corresponding text representation.
 *
 * @param text - The hexadecimal string to decode.
 * @returns The decoded text.
 */
export const decodeHex = (text: string) => {
  const bytes = [...text.matchAll(/[0-9a-f]{2}/g)].map((a) =>
    parseInt(a[0], 16)
  );
  return Buffer.from(bytes).toString();
};
// ================================= Zlib ============================================= /////
/**
 * Compresses a file using gzip compression and saves it to the specified destination.
 *
 * @param source - The path of the file to be compressed.
 * @param destination - The path where the compressed file will be saved.
 * @returns A Promise that resolves when the compression is complete.
 * @throws If an error occurs during the compression process.
 */
export const zip = async (source: string, destination: string) => {
  const zip = zlib.createGzip();
  const pipe = promisify(pipeline);
  const sou = fs.createReadStream(source);
  const des = fs.createWriteStream(destination);
  await pipe(sou, zip, des).catch((err) => {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  });
};

/**
 * Unzips a file from the source path and saves it to the destination path.
 *
 * @param {string} source - The path of the file to be unzipped.
 * @param {string} destination - The path where the unzipped file will be saved.
 * @returns {Promise<void>} - A promise that resolves when the file is successfully unzipped.
 * @throws {Error} - If an error occurs during the unzipping process.
 */
export const unzip = async (
  source: string,
  destination: string
): Promise<void> => {
  const sou = fs.createReadStream(source);
  const des = fs.createWriteStream(destination);
  try {
    sou.pipe(zlib.createGunzip()).pipe(des);
    console.log("Uzip succeeded.");
  } catch (error) {
    console.error("An error occurred:", error);
    process.exitCode = 1;
  }
};
// ============================================= File System =============================================== ////
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
 * Creates a new file at the specified file path.
 *
 * @param {string} filePath - The path where the file should be created.
 * @returns {Promise<void>} - A promise that resolves when the file is successfully created.
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

// ===================================== Crypto =========================================== ////

/**
 * Creates an array of binary characters from a binary string.
 *
 * @param binaryString - The binary string to convert into an array.
 * @returns An array of binary characters.
 */
export const createBinaryArray = (binaryString: string) => {
  const binaryArray: string[] = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    const binaryChar = binaryString.substr(i, 8);
    binaryArray.push(binaryChar);
  }
  return binaryArray;
};
/**
 * Converts a binary string to an array of decimal numbers.
 * 
 * @param bin - The binary string to convert.
 * @returns An array of decimal numbers.
 * @throws {Error} If the binary string is invalid.
 */
export const bin2des = (bin: string) => {
  const binaryArray = createBinaryArray(bin);
  let decim: string[] = [];
  binaryArray.forEach((binary) => {
    if (binary.length > 8) {
      throw new Error("Check Binary Number");
    }
    const deci: string = parseInt(binary, 2).toString();
    decim.push(deci);
  });
  return decim;
};
/**
 * Converts a binary string to a hexadecimal string.
 *
 * @param bin - The binary string to convert.
 * @returns The hexadecimal string representation of the binary string.
 * @throws {Error} If the binary string is not valid.
 */
export const bin2hex = (bin: string) => {
  const binn = createBinaryArray(bin);
  let hexArray: string[] = [];
  binn.forEach((binary) => {
    if (binary.length > 8) {
      throw new Error("Check Binary Number");
    }
    const decimal = parseInt(binary, 2);
    const hex = decimal.toString(16);
    hexArray.push(hex);
  });
  const hexx = hexArray.join("");
  return hexx;
};
/**
 * Converts a given text into binary representation.
 * 
 * @param text - The text to be converted into binary.
 * @returns The binary representation of the given text.
 */
export const text2bin = (text: string) => {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const binaryChar = charCode.toString(2).padStart(8, "0");
    binary += binaryChar;
  }
  return binary;
};
/**
 * Converts a binary string to a text string.
 *
 * @param binary - The binary string to convert.
 * @returns The converted text string.
 */
export const bin2text = (binary: any) => {
  let text = "";
  for (let i = 0; i < binary.length; i += 8) {
    const binaryChar = binary.substr(i, 8);
    const charCode = parseInt(binaryChar, 2);
    const char = String.fromCharCode(charCode);
    text += char;
  }
  return text;
};
/**
 * Converts a given text to base64 encoding.
 * 
 * @param text - The text to be converted.
 * @returns The base64 encoded string.
 */
export const text2b64 = (text: string) => {
  return Buffer.from(text).toString("base64");
};
/**
 * Converts a decimal number to binary representation.
 * 
 * @param des - The decimal number to convert to binary.
 * @returns The binary representation of the decimal number.
 */
export const des2bin = (des: any) => {
  return des.toString(2);
};
/**
 * Calculates the HMAC (Hash-based Message Authentication Code) using the SHA256 algorithm.
 * 
 * @param secret - The secret key used for generating the HMAC.
 * @returns The HMAC value as a hexadecimal string.
 */
export const hmac = (secret: any) => {
  const mac = createHmac("sha256", secret).update("Mingalarpar").digest("hex");
  return mac;
};
/**
 * Calculates the SHA256 hash of a given secret.
 * 
 * @param secret - The secret to be hashed.
 * @returns The SHA256 hash of the secret.
 */
export const hash = (secret: any) => {
  const has = createHash("sha256", secret).update("Mingalarpar").digest("hex");
  return has;
};

// ====================================== Others ========================================================////
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

// ========================================================================================================================================///
