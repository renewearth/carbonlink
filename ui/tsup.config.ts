import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/index.ts",
    "src/components/charts/index.ts",
    "src/components/charts/bar/index.ts",
    "src/components/charts/donut/index.ts",
    "src/components/charts/options/index.ts",
    "src/components/forms/index.ts",
    "src/components/forms/Select/index.ts",
    "src/components/Feedback/index.ts",
    "src/components/Feedback/Snackbar/index.ts",
    "src/components/Feedback/Modal/index.ts",
    "src/components/NoData/index.ts",
    "src/components/table/index.ts",
    "src/theme/index.ts",
    "src/components/charts/common/types/index.ts",
    "src/types/common.ts",
    "src/types/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  outDir: "dist",
});
