import { readJson } from "./readJson";

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


