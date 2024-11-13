import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/index.ts",
    "src/components/charts/index.ts",
    "src/components/charts/bar/index.ts",
    "src/components/charts/donut/index.ts",
    "src/components/charts/options/index.ts",
    "src/components/table/index.ts",
    "src/theme/index.ts",
    "src/components/charts/common/types/index.ts", // 추가
    "src/types/common.ts", // 추가
    "src/types/index.ts", // 추가
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  outDir: "dist",
});
