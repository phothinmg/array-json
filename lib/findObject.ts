import { readJson } from "./readJson";
import { writeJson } from "./writeJson";
import { exist } from "./exist";

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
