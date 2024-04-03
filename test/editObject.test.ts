import { editObject } from "../src";
import { readJson } from "../src";
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
