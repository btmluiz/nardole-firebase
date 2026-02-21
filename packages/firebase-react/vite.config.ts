import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(process.cwd(), "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        /^@firebase\/.*$/,
        "react/jsx-runtime",
      ],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      tsconfigPath: "../../tsconfig.app.json",
      rollupTypes: true,
      include: ["../**/*.{ts,tsx}"],
    }),
  ],
});
