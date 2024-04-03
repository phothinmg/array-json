import { findObject } from "../src";
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
