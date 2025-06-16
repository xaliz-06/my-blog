// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import db from "@astrojs/db";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  build: {
    format: "file",
  },
  image: { domains: ["ufs.sh"] },
  site: "https://nullpoint.xaliz.xyz",
  base: "/",
  trailingSlash: "always",

  integrations: [mdx(), sitemap(), react(), db()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
  },

  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
});
