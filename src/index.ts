/* 
Read and Write a JSON file in Node.js.
Add, Edit and Remove an object from Array as JSON file in Node.js.
Find Object and Get File Data  from Array as JSON file in Node.js.
Copyright (c) 2024 Pho Thin Maung
*/
import {
  access,
  constants,
  open,
  mkdir,
  writeFile,
  unlink,
  rename,
} from "node:fs/promises";
import { dirname } from "node:path";
import zlib from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import * as fs from "node:fs";

/**
 * Checks if a file or directory exists and is readable.
 *
 * @param target - The path to the file or directory to check.
 * @returns A promise that resolves to a boolean indicating if the target exists and is readable.
 * @example
 * const filePath = "path/to/file";
 * const exists = await exist(filePath);
 */
export const exist = async (target: string): Promise<boolean> => {
  try {
    await access(target, constants.F_OK | constants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
};

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

/**
   * Removes an object from a JSON file based on its ID.
   * ---------------------------------------------------
   * 
   * 
   * @param {string} filePath - The path to the JSON file.
   * @param {any} id - The ID of the object to be removed.
   * @returns {Promise<void>} - A promise that resolves when the object is successfully removed.
   * @throws {Error} - If there is an error while removing the object.
   * 
   * 
    - Check if the JSON file exists using the exist function.
    - If the file does not exist, log an error message and exit the process.
    - Load the JSON file using the readJson function.
    - Filter the loaded JSON content to create a new array without the item with the matching ID.
    - Write the updated content back to the JSON file using the writeJson function.
  
    @example
    await removeObject("data.json", 123);
*/
export const removeObject = async (
  filePath: string,
  id: number | string
): Promise<void> => {
  try {
    const exists = await exist(filePath);
    if (!exists) {
      throw new Error(`${filePath} does not exist.`);
    }
    // Load the JSON file
    const tableContent: any[] = await readJson(filePath);

    // Filter the loaded JSON content to create a new array without the item with the matching ID
    const remainContent = tableContent.filter((item) => item.id !== id);

    // Write the updated content back to the JSON file
    await writeJson(filePath, remainContent);
  } catch (error) {
    console.log(error);
  }
};

/**
   * Reads the content of a JSON file and returns it as an array.
   * ------------------------------------------------------------
   * 
   * *********
   * 
   * If there is an error during the file reading process, an empty array is returned.
   * @param filePath - The path to the JSON file.
   * @returns An array containing the content of the JSON file specified by `filePath`.
   * 
   * ********
   * 
    - This code defines a function named getFileData that reads JSON data from a file and returns it as an array. 
    - If there is an error during the process, it logs the error and returns an empty array.
  
    ********
    
    @example
    const filePath = "data.json";
    const data = await getFileData(filePath);
    console.log(data); // Output: [ { id: 1, name: "John" }, { id: 2, name: "Jane" }, ... ]
  */
export const getFileData = async (filePath: string): Promise<any[]> => {
  try {
    const tableContent: any[] = await readJson(filePath);
    return tableContent;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Adds an object to a JSON file.
 * ------------------------------
 * 
 * *****
 * 
 * @param filePath - The path to the JSON file.
 * @param content - The object to be added to the JSON file.
 * 
 * ******
 * 
  - The addObject function adds an object to a JSON file by first checking if the file exists. 
  - If the file does not exist, an error message is displayed. If the file exists, the function reads the existing data from the file, 
  - appends the new object to the data, and then writes the updated data back to the file.

***********

@example
  const filePath = "data.json";
  const id = 1;
  const content = { name: "John", age: 30 };
  addObject(filePath, id, content);
* 
 */
export const addObject = async (filePath: string, id: any, content: object) => {
  try {
    const exists = await exist(filePath);
    if (!exists) {
      console.error(`${filePath} does not exist. Create ${filePath} first.`);
      process.exitCode = 1;
      return;
    }
    const newData = {
      id: id,
      ...content,
    };
    const existingData: any[] = await readJson(filePath);
    const updatedData = [...existingData, newData];

    await writeJson(filePath, updatedData);
  } catch (error) {
    console.log(error);
  }
};

/**
   * Edits an object in a JSON file.
   * -------------------------------
   * 
   * ****
   * 
   * @param filePath - The path to the JSON file.
   * @param id - The identifier of the object to be edited.
   * @param content - The new content to replace the existing content of the object.
   * 
   * ****
   * 
    - This code defines a function named editObject that is used to edit an object in a JSON file. 
    - It checks if the file exists, reads the JSON content, finds the object with the specified ID, 
      merges the existing content with the new content, replaces the existing object with the new object, 
      and writes the updated content back to the JSON file.
  
    @example
    editObject("data.json", 1, { name: "John Doe" });
  */
export const editObject = async (
  filePath: string,
  id: any,
  content: object
) => {
  try {
    // Check if the JSON file exists at the specified filePath
    const tableFileExists = await exist(filePath);
    if (!tableFileExists) {
      throw new Error(`${filePath} does not exist`);
    }

    // Read the JSON file and parse its content into an array of objects
    const tableContent: any[] = await readJson(filePath);

    // Find the object in the array with the specified id
    const content2edit: any = tableContent.find((item) => item.id === id);

    // Create a new object by merging the existing content of the object with the new content
    const editedContent = {
      id: content2edit.id,
      ...content,
    };

    // Replace the existing object in the array with the new object
    const finalContent = tableContent.map((item) => {
      if (item.id === id) {
        return editedContent;
      }
      return item;
    });

    // Write the updated array of objects back to the JSON file
    setTimeout(async () => {
      await writeJson(filePath, finalContent);
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Finds an object with a matching ID in a JSON file.
 * ---------------------------------------------------
 * 
 * ***********
 * 
 * @param filePath - The path to the JSON file.
 * @param id - The ID to search for.
 * @returns The found object or undefined if no match is found.
 * 
 * ***********
 * 
  - The findObject function searches for an object with a matching ID in a JSON file.

 * ***********
  @example
  const filePath = "data.json";
  const id = 123;
  const result = await findObject(filePath, id);
  console.log(result);
*/
export const findObject = async (filePath: string, id: any) => {
  try {
    const exists = await exist(filePath);
    if (!exists) {
      throw new Error(`${filePath} does not exist`);
    }
    const tableContent: any[] = await readJson(filePath);
    const findContent = tableContent.filter((i) => i.id === id);
    return findContent[0];
  } catch (error) {
    console.log(error);
  }
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
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
  await promisify(pipeline)(sou, zlib.createGunzip(), des).catch((error) => {
    console.error("An error occurred during unzipping:", error);
    process.exitCode = 1;
  });
  console.log("Unzip succeeded.");
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

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
