import { exist } from "../src/util/index";
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
