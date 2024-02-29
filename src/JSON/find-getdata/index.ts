/* 
Find Object and Get File Data  from Array as JSON file in Node.js.
Copyright (c) 2024 Pho Thin Maung
*/

import { readJson, writeJson } from "../read-and-write/index.ts";
import { exist } from "../../UTIL/index.ts";

/**
 * Finds an object with a matching ID in a JSON file.
 * ---------------------------------------------------
 * 
 *Summary
  -------
  The findObject function searches for an object with a matching ID in a JSON file.

  Inputs
  -----
  filePath (string): The path to the JSON file.
  id (any): The ID to search for.

  Flow
  ----
  Check if the JSON file exists using the exist function.
  If the file does not exist, log an error message and set the process exit code to 1.
  Read the JSON file using the readJson function.
  Filter the content of the JSON file to find objects with a matching ID.
  Return the found objects.

  Outputs
  ------
  The found object(s) with a matching ID, or undefined if no match is found.

  Example Usage
  -------------
  const filePath = "data.json";
  const id = 123;
  const result = await findObject(filePath, id);
  console.log(result);


 * @param filePath - The path to the JSON file.
 * @param id - The ID to search for.
 * @returns The found object or undefined if no match is found.
 * @includeExample ./src/JSON/find-getdata/example.ts: 1-5
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

  Summary
  -------
  This code defines a function named getFileData that reads JSON data from a file and returns it as an array. 
  If there is an error during the process, it logs the error and returns an empty array.

  Inputs
  ------
  filePath (string): The path to the JSON file.

  Flow
  ----
  The function calls the readJson function to read the JSON data from the file specified by filePath.
  If the reading is successful, the function returns the JSON data as an array.
  If there is an error during the reading process, the function logs the error and returns an empty array.

  Outputs
  -------
  An array containing the JSON data read from the file.

  Usage example
  -------------
  const filePath = "data.json";
  const data = await getFileData(filePath);
  console.log(data); // Output: [ { id: 1, name: "John" }, { id: 2, name: "Jane" }, ... ]


 * If there is an error during the file reading process, an empty array is returned.
 * @param filePath - The path to the JSON file.
 * @returns An array containing the content of the JSON file specified by `filePath`.
 * @includeExample ./src/JSON/find-getdata/example.ts: 7-10
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
