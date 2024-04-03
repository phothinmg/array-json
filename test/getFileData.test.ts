import { getFileData } from "../src";
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
