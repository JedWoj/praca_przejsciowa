import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
