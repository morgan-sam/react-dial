import { defineConfig } from "vite"; // Use ESM import for defineConfig
import reactRefresh from "@vitejs/plugin-react-refresh";
import vitePluginSass from "vite-plugin-sass";

export default defineConfig({
  plugins: [reactRefresh()],
});
