import { open } from "fs/promises";

/**
 * Asynchronous function that reads a JSON file from the specified file path.
 * --------------------------------------------------------------------------
 
  
 * 
 * @param filePath The path to the JSON file.
 * @returns A Promise that resolves to the parsed JSON content of the file.
 * @throws If the file does not exist or if there is an error reading the file.
 * 
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
