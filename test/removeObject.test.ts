import { removeObject } from "../src";
import { readJson } from "../src";
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
