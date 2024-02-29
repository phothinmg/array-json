import { readJson } from "../index.ts";
const filePath = "path/to/file.json";
readJson(filePath)
  .then((jsonContent) => {
    console.log(jsonContent);
  })
  .catch((error) => {
    console.error(error);
  });

import { writeJson } from "../index.ts";
const filePath2 = "path/to/file.json";
const content = { name: "John", age: 30 };

writeJson(filePath2, content)
  .then(() => {
    console.log("JSON content written to file successfully");
  })
  .catch((error: any) => {
    console.error("Failed to write JSON to file:", error);
  });
