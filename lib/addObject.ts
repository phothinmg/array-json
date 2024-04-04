import { readJson } from "./readJson";
import { writeJson } from "./writeJson";
import { exist } from "./exist";

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
