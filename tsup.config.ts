import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/util/index.ts"],
  outDir: "./dist/util",
  splitting: true,
  sourcemap: true,
  // dts: true,
  format: "cjs",
  bundle: true,
  treeshake: true,
});
