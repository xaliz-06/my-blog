import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      isPinned: z.coerce.boolean().optional(),
      heroImage: z.string().optional(),
      primaryTags: z.array(z.string()),
      secondaryTags: z.array(z.string()).optional(),
      author: z.string().optional(),
      minutesToRead: z.coerce.number().optional(),
      nextBlogPost: z.string().optional(),
      prevBlogPost: z.string().optional(),
    }),
});

export const collections = { blog };
