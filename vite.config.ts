import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";
import { globSync } from "fs";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(process.cwd(), "lib/main.ts"),
      formats: ["es"],
    },
    rolldownOptions: {
      external: [...Object.keys([]), "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync("lib/**/*.{ts,tsx}", {
          exclude: ["lib/**/*.d.ts"],
        }).map((file) => [
          relative("lib", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
  ],
});
