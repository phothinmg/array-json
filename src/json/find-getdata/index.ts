/* 
Find Object and Get File Data  from Array as JSON file in Node.js.
Copyright (c) 2024 Pho Thin Maung
*/

import { readJson, writeJson } from "../read-and-write/index.ts";
import { exist } from "../../helpers/file-system/index.ts";

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
      console.error(`${filePath} does not exist`);
      process.exitCode = 1;
      return;
    }
    const tableContent: any[] = await readJson(filePath);
    const findContent = tableContent.filter((i) => i.id === id);
    return findContent[0];
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
