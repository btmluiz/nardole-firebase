import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
import { fileURLToPath } from "url";
import { glob } from "glob";

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.devDependencies || {}).filter(
    (dep) => !dep.startsWith("@types/"),
  ),
  "react/jsx-runtime",
];

// const externalPatterns = external.map((dep) => new RegExp(`^${dep}(/.*)?$`));

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    minify: false,
    lib: {
      entry: glob.sync("src/**/*.{ts,tsx}", {
        ignore: ["**/*.{test,spec}.{ts,tsx}"],
        cwd: resolve(__dirname, "src"),
        absolute: true,
      }),
      formats: ["es"],
    },
    rolldownOptions: {
      external: external,
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts"],
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        // entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    dts({
      tsconfigPath: "../../tsconfig.app.json",
      include: ["src/**/*"],
      exclude: [
        "node_modules/**",
        "**/*.test.*",
        "**/__tests__/**",
        "**/*.stories.*",
      ],
      outDir: "dist",
      staticImport: true,
      insertTypesEntry: false,
    }),
  ],
});
