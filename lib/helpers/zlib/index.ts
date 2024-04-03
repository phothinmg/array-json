import zlib from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import * as fs from "node:fs";

/**
 * Compresses a file using gzip compression and saves it to the specified destination.
 * ---
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
 * -----
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
