// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { z } from "astro/zod";

export const SITE_TITLE = "Null Point";
export const SITE_DESCRIPTION =
  "A blog created and written by Boibhav Chakraborty";

export const UPLOADTHING_APP_ID = "1xfiqcpubh";

export const NULL_PT_LOGO = "4kRtTpOgB9LtV0GqKYBWTyoQUnY3PecszBfrM46xCdKXjL8G";
export const NULL_PT_BANNER =
  "4kRtTpOgB9Lt25K0a6vTVHy3kxXWLgC5zdrKUNA6v1nMetBq";

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
