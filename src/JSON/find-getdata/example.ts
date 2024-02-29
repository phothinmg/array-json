import { findObject } from "./index.ts";
const filePath = "data.json";
const id = 123;
const result = await findObject(filePath, id);
console.log(result);

import { getFileData } from "./index.ts";
const filePath2 = "data.json";
const data = await getFileData(filePath2);
console.log(data); // Output: [ { id: 1, name: "John" }, { id: 2, name: "Jane" }, ... ]
