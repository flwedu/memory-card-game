/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 9000,
  },
  test: {
    environment: "jsdom",
    globals: true,
    environmentOptions: {
      jsdom: {
        url: "http://localhost/",
      },
    },
  },
});
