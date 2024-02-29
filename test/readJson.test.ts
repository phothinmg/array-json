import { readJson } from "../src/read-and-write/index";

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
