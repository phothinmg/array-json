import { addObject } from "../src";
import { readJson } from "../src";
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
