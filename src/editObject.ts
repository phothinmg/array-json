import { readJson } from "./readJson";
import { writeJson } from "./writeJson";
import { exist } from "./exist";

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
