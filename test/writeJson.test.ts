import { readFile } from "fs/promises";
import { writeJson } from "../src";
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
