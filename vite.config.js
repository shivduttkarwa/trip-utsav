import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
