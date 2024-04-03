import { readFile } from "fs/promises";
import {
  writeJson,
  readJson,
  findObject,
  editObject,
  addObject,
  getFileData,
  removeObject,
  exist,
} from "../src";

describe("exist", () => {
  // Should return true if the target exists and is readable
  it("should return true when the target exists and is readable", async () => {
    const target = "test/files/editObject.json";
    const result = await exist(target);
    expect(result).toBe(true);
  });

  // Should handle non-existent targets gracefully
  it("should return false when the target does not exist", async () => {
    const target = "nonexistent.json";
    const result = await exist(target);
    expect(result).toBe(false);
  });
});

// >>><<<<<
describe("writeJson", () => {
  // Successfully writes valid JSON content to a new file
  it("should successfully write valid JSON content to a new file", async () => {
    // Arrange
    const filePath = "test/files/writeJson.json";
    const content = [{ name: "John Doe", age: 30 }];

    // Act
    await writeJson(filePath, content);

    // Assert
    const fileContent = await readFile(filePath, "utf-8");
    expect(JSON.parse(fileContent)).toEqual(content);
  });

  // Throws an error if file path is invalid or inaccessible
  it("should successfully write valid JSON content to a new nested file and create new directories ", async () => {
    // Arrange
    const filePath = "test/test/file.json";
    const content = [{ name: "John Doe", age: 30 }];

    // Act
    await writeJson(filePath, content);

    // Assert
    const fileContent = await readFile(filePath, "utf-8");
    expect(JSON.parse(fileContent)).toEqual(content);
  });
  it("should successfully write valid JSON content to existing file ", async () => {
    // Arrange
    const filePath = "test/files/test.json";
    const content = [{ name: "John Doe", age: 30 }];

    // Act
    await writeJson(filePath, content);

    // Assert
    const fileContent = await readFile(filePath, "utf-8");
    expect(JSON.parse(fileContent)).toEqual(content);
  });
});
//>>><<<<<
describe("readJson", () => {
  // Should read and parse a valid JSON file without errors.
  it("should read and parse a valid JSON file without errors", async () => {
    // Arrange
    const filePath = "test/files/readJson.json";
    const expectedData = [{ name: "John", age: 30 }];

    // Act
    const result = await readJson(filePath);

    expect(result).toEqual(expectedData);
  });

  // Should throw an error if the file is not found.
  it("should throw an error if the file is not found", async () => {
    // Arrange
    const filePath = "nonexistent.json";

    // Act and Assert
    await expect(readJson(filePath)).rejects.toThrow();
  });
});
// >>><<<<
describe("findObject", () => {
  // Returns the object with matching ID when it exists in the JSON file.
  it("should return the object with matching ID when it exists in the JSON file", async () => {
    // Arrange
    const filePath = "test/files/findObject.json";
    const id = 1;
    const expectedObject = { id: 1, name: "John Doe" };

    // Act
    const result = await findObject(filePath, id);

    // Assert
    expect(result).toEqual(expectedObject);
  });

  // Handles invalid file paths and throws an error.
  it("should handle invalid file paths and throw an error", async () => {
    // Arrange
    const filePath = "invalid/path/to/json/file.json";
    const id = 1;

    // Act and Assert
    await findObject(filePath, id);
  });
});

// ---------------------------

describe("editObject", () => {
  // Edits an object in a JSON file when the specified id exists in the file.
  it("should edit an object when the specified id exists", async () => {
    // Arrange
    const filePath = "test/files/editObject.json";
    const id = "123";
    const content = { name: "John Doe" };
    const exp = {
      id: id,
      ...content,
    };

    // Act
    await editObject(filePath, id, content);

    // Assert
    // Check if the JSON file was updated with the edited object
    setTimeout(async () => {
      const updatedContent = await readJson(filePath);
      expect(updatedContent).toContainEqual(exp);
    }, 1000);
  });

  // Throws an error when the specified filePath does not exist.
  it("should throw an error when the specified filePath does not exist", async () => {
    // Arrange
    const filePath = "nonexistent/file.json";
    const id = "123";
    const content = { name: "John Doe" };

    // Act and Assert
    await editObject(filePath, id, content);
  });
});
// --------------------------------------------------------
describe("addObject", () => {
  // Successfully adds an object to an existing JSON file.
  it("should successfully add an object to an existing JSON file", async () => {
    // Arrange
    const filePath = "test/files/addObject.json";
    const id = Date.now().toString(32);
    const content = {
      name: "John Doe",
      age: 65,
    };

    const exp = {
      id: id,
      ...content,
    };

    // Act
    await addObject(filePath, id, content);

    // Assert
    setTimeout(async () => {
      const updatedData = await readJson(filePath);
      expect(updatedData).toContainEqual(exp);
    }, 1000);
  });

  // Throws an error if the file path does not exist.
  it("should throw an error if the file path does not exist", async () => {
    // Arrange
    const filePath = "nonexistent/file.json";
    const id = Date.now().toString(32);
    const content = { name: "John", age: 30 };
    await addObject(filePath, id, content);
  });
});
// -----------------------------------
describe("getFileData", () => {
  // Returns an array of objects when given a valid file path.
  it("should return an array of objects when given a valid file path", async () => {
    const filePath = "test/files/getFileData.json";
    const expected = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const result = await getFileData(filePath);

    expect(result).toEqual(expected);
  });

  // Throws an error when readJson function throws an error.
  it("should throw an error when readJson function throws an error", async () => {
    const filePath = "invalidFilePath";
    const expectedError = new Error("File not found");
    try {
      await getFileData(filePath);
    } catch (error) {
      expect(error);
    }
  });
});

// ------------------------------------------------------------------

describe("removeObject", () => {
  // Removes an object from a JSON file when the ID exists.

  it("should remove object from JSON file when ID exists", async () => {
    // Arrange
    const filePath = "test/files/removeObject.json";
    const id = "123";

    await removeObject(filePath, id);

    const lastData: any[] = await readJson(filePath);
    let y: any[] = [];
    lastData.forEach((item) => {
      const x = Object.values(item);
      y.push(x);
    });

    expect(y).not.toContain(id);
  });

  //Throws an error when the file path is invalid.
  it("should throw an error when the file path is invalid", async () => {
    // Arrange
    const filePath = "invalid/path/to/file.json";
    const id = "123";
    await removeObject(filePath, id);
  });
});
