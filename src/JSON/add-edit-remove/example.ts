import { addObject } from "./index.ts";
const filePath = "data.json";
const id = 1;
const content = { name: "John", age: 30 };
addObject(filePath, id, content);


import { editObject } from "./index.ts";
editObject("data.json", 1, { name: "John Doe" });

import { removeObject } from "./index.ts";
await removeObject("data.json", 123);
