import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "./dist/cjs",
  // splitting: true,
  sourcemap: true,
  clean: true,
  // dts: true,
  format: "cjs",
  bundle: true,
  treeshake: true,
});
