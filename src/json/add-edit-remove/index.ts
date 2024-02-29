/* 
Add, Edit and Remove an object from Array as JSON file in Node.js
Copyright (c) 2024 Pho Thin Maung
*/

import { readJson, writeJson } from "../read-and-write/index.ts";
import { exist } from "../../helpers/index.ts";

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
 * Removes an object from a JSON file based on its ID.
 * ---------------------------------------------------
 * 
 * *******
 * 
 * @param {string} filePath - The path to the JSON file.
 * @param {any} id - The ID of the object to be removed.
 * @returns {Promise<void>} - A promise that resolves when the object is successfully removed.
 * @throws {Error} - If there is an error while removing the object.
 * 
 * ******
 * 
  - Check if the JSON file exists using the exist function.
  - If the file does not exist, log an error message and exit the process.
  - Load the JSON file using the readJson function.
  - Filter the loaded JSON content to create a new array without the item with the matching ID.
  - Write the updated content back to the JSON file using the writeJson function.

  @example
  await removeObject("data.json", 123);

 *

 
 */
export const removeObject = async (
  filePath: string,
  id: any
): Promise<void> => {
  try {
    const exists = await exist(filePath);
    if (!exists) {
      console.error(`${filePath} does not exist.`);
      process.exitCode = 1;
      return;
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
