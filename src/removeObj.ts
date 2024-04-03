import { readJson } from "./readJson";
import { writeJson } from "./writeJson";
import { exist } from "./exist";

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
