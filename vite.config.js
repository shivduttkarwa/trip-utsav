import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /* GitHub Pages serves a project repo from https://<user>.github.io/<repo>/,
     so every built URL needs that prefix. Vite applies it to the HTML and CSS
     it generates; public assets referenced from JS go through src/asset.js,
     which reads the same value back out of import.meta.env.BASE_URL.

     Change this in one place if the site ever moves to a custom domain or a
     user page — it becomes "/" and asset() turns into a no-op. */
  base: "/trip-utsav/",
  /* host: true binds to 0.0.0.0 rather than localhost, so the dev server is
     reachable from a phone on the same WiFi — plain `npm run dev` is enough, no
     --host flag. strictPort holds the address at :5173 instead of walking up to
     the next free port, so the URL typed into the phone cannot quietly stop
     pointing at the running server. */
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
});
