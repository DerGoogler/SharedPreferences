import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    // core: "src/index.ts",
    // error: "src/util/SharedPreferenceError.ts",
  },
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
