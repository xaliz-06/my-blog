// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

import react from "@astrojs/react";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  build: {
    format: "file",
  },
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react(), pagefind(), db()],
  vite: {
    plugins: [tailwindcss()],
  },
});