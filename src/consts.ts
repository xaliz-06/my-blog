// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { z } from "astro/zod";

export const SITE_TITLE = "Astro Blog";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const CommentSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")), // allows empty email

  message: z
    .string()
    .trim()
    .min(1, { message: "Comment must be at least 1 characters long" })
    .max(500, { message: "Comment is too long" }),
  postSlug: z.string().trim().min(1, { message: "Post slug is required" }),
});
