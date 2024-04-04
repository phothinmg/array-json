import { dirname } from "node:path";
import { mkdir, writeFile } from "fs/promises";

/** 
* Asynchronous function that writes JSON content to a file at the specified file path.
-------------------------------------------------------------------------------------
* @param filePath The path to the file where the JSON content will be written.
* @param content The JSON content to be written to the file.
* @returns A Promise that resolves when the JSON content has been successfully written to the file.
* @throws If there is an error creating the parent directory, writing the file, or stringifying the JSON content.
      - The writeJson function is an asynchronous function that writes JSON content to a file at the specified file path. 
      - It creates the parent directory if it doesn't exist, stringifies the JSON content, and writes it to the file.
* @example
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
