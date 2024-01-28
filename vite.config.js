import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Set the target ECMAScript version
    target: "es2022", // or 'esnext' if you want the latest
  },
  build: {
    target: "esnext",
  },
});
