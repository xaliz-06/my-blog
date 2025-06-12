import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Comment } from "astro:db";

export const server = {
  addComment: defineAction({
    accept: "form",
    input: z.object({
      postSlug: z.string(),
      username: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required").optional(),
      message: z.string().min(1, "Comment cannot be empty"),
    }),
    handler: async ({ postSlug, username, email, message }) => {
      const comment = await db
        .insert(Comment)
        .values({
          postSlug,
          email: email ?? null,
          username,
          message,
        } as typeof Comment.$inferInsert)
        .returning();

      return comment[0];
    },
  }),
};
