import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleContact } from "./server/contact";

// Serves POST /api/contact during `npm run dev` (production uses api/contact.ts).
const contactApi = (): Plugin => ({
  name: "contact-api",
  configureServer(server) {
    server.middlewares.use("/api/contact", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end();
        return;
      }

      let raw = "";
      for await (const chunk of req) raw += chunk;

      let payload: unknown = null;
      try {
        payload = JSON.parse(raw);
      } catch {
        // handled by validation in handleContact
      }

      const { status, body } = await handleContact(payload);
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Expose server-only secrets (e.g. RESEND_API_KEY) to the dev API, not to the client bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), contactApi(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
