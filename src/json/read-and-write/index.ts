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
  Summary
  -------
  This code defines an asynchronous function called readJson that reads the content of a JSON file from the specified file path. 
  It uses the open function from the fs/promises module to open the file, creates a read stream from the file handler, and reads the file in chunks. 
  The chunks are concatenated into a buffer, which is then converted to a string using the UTF-8 encoding. 
  Finally, the string is parsed as JSON and returned.

  Inputs
  ------
  filePath (string): The path to the JSON file.

  Flow
  -----
  The function starts by opening the file specified by filePath using the open function, which returns a file handler.
  A read stream is created from the file handler using the createReadStream method.
  An empty array called chunks is initialized to store the chunks of data read from the stream.
  The function iterates over the stream using a for await...of loop, reading each chunk of data and pushing it into the chunks array.
  The chunks are concatenated into a single buffer using the Buffer.concat method.
  The buffer is converted to a string using the UTF-8 encoding.
  The string is parsed as JSON using the JSON.parse method.
  The parsed JSON content is returne.

  Outputs
  -------
  Promise: A Promise that resolves to the parsed JSON content of the file.

  Usage example
  ------------
  const filePath = "path/to/file.json";
  readJson(filePath)
    .then((jsonContent) => {
      console.log(jsonContent);
    })
    .catch((error) => {
      console.error(error);
    });
    In this example, the readJson function is called with the filePath variable set to the path of the JSON file to be read. 
    The function returns a Promise that resolves to the parsed JSON content of the file. The resolved value is logged to the console. 
    If there is an error reading the file, it is caught and logged to the console.
 *
 * @param filePath The path to the JSON file.
 * @returns A Promise that resolves to the parsed JSON content of the file.
 * @throws If the file does not exist or if there is an error reading the file.
 * @includeExample ./src/JSON/read-and-write/example.ts: 1-9
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
  Summary
  -------
  The writeJson function is an asynchronous function that writes JSON content to a file at the specified file path. 
  It creates the parent directory if it doesn't exist, stringifies the JSON content, and writes it to the file.

  Inputs
  -----
  filePath (string): The path to the file where the JSON content will be written.
  content (object): The JSON content to be written to the file.

  Flow
  ----
  The function starts by extracting the parent path from the filePath using the dirname function from the node:path module.
  It creates the parent directory using the mkdir function from the node:fs/promises module, with the recursive option set to true to create intermediate directories if necessary.
  The content object is stringified into a JSON string with indentation using the JSON.stringify function.
  A delay of zero milliseconds is introduced using the setTimeout function to allow any pending I/O operations to complete.
  The stringified JSON content is written to the file using the writeFile function from the node:fs/promises module.

  Outputs
  -------
  None. The function returns a Promise<void> which resolves when the JSON content has been successfully written to the file.

  Usage example
  -------------
  const filePath = "path/to/file.json";
  const content = { name: "John", age: 30 };

  writeJson(filePath, content)
    .then(() => {
      console.log("JSON content written to file successfully");
    })
    .catch((error) => {
      console.error("Failed to write JSON to file:", error);
    });

    In this example, the writeJson function is called with the filePath variable set to the path of the file where the JSON content will be written, 
    and the content variable set to the JSON content to be written. 
    The function returns a Promise that resolves when the JSON content has been successfully written to the file. 
    If there is an error creating the parent directory, writing the file, or stringifying the JSON content, the error is caught and logged to the console.

 *
 * @param filePath The path to the file where the JSON content will be written.
 * @param content The JSON content to be written to the file.
 * @returns A Promise that resolves when the JSON content has been successfully written to the file.
 * @throws If there is an error creating the parent directory, writing the file, or stringifying the JSON content.
 * @includeExample ./src/JSON/read-and-write/example.ts: 11-21
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
