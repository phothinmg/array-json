/* 
Read and Write a JSON file in Node.js
Copyright (c) 2024 Pho Thin Maung
*/

import { open, mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Asynchronous function that reads a JSON file from the specified file path.
 * --------------------------------------------------------------------------
 * 
 *************
 
  
 * 
 * @param filePath The path to the JSON file.
 * @returns A Promise that resolves to the parsed JSON content of the file.
 * @throws If the file does not exist or if there is an error reading the file.
 * 
 *************
 * 
 *  - This code defines an asynchronous function called readJson that reads the content of a JSON file from the specified file path. 
 *  - It uses the open function from the fs/promises module to open the file, creates a read stream from the file handler, and reads the file in chunks. 
 * - The chunks are concatenated into a buffer, which is then converted to a string using the UTF-8 encoding. 
 * - Finally, the string is parsed as JSON and returned.
 * 
 **************
 * 
 * @example
  const filePath = "path/to/file.json";
  readJson(filePath)
    .then((jsonContent) => {
      console.log(jsonContent);
    })
    .catch((error) => {
      console.error(error);
    });
 *
 */

export const readJson = async (filePath: string): Promise<any> => {
  try {
    const fileHandler = await open(filePath, "r");
    const stream = fileHandler.createReadStream();
    const chunks: Array<Uint8Array> = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const readString = buffer.toString("utf-8");

    return JSON.parse(readString);
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;
    if (typedError.code === "ENOENT") {
      console.error("File not found:", filePath);
    }
    process.exitCode = 1;
    throw error;
  }
};
/**
 * Asynchronous function that writes JSON content to a file at the specified file path.
 * -------------------------------------------------------------------------------------
 * 
 *******************
 * 
 * @param filePath The path to the file where the JSON content will be written.
 * @param content The JSON content to be written to the file.
 * @returns A Promise that resolves when the JSON content has been successfully written to the file.
 * @throws If there is an error creating the parent directory, writing the file, or stringifying the JSON content.
 * 
 *********************

  - The writeJson function is an asynchronous function that writes JSON content to a file at the specified file path. 
  - It creates the parent directory if it doesn't exist, stringifies the JSON content, and writes it to the file.

***********************

@example
 const filePath = "path/to/file.json";
  const content = { name: "John", age: 30 };

  writeJson(filePath, content)
    .then(() => {
      console.log("JSON content written to file successfully");
    })
    .catch((error) => {
      console.error("Failed to write JSON to file:", error);
    });
 */
export const writeJson = async (
  filePath: string,
  content: object
): Promise<void> => {
  try {
    const parentPath = dirname(filePath);
    await mkdir(parentPath, { recursive: true });
    const jsonContent = JSON.stringify(content, null, 2);
    await new Promise((resolve) => setTimeout(resolve));
    await writeFile(filePath, jsonContent);
  } catch (error) {
    throw new Error(`Failed to write JSON to file: ${error}`);
  }
};
