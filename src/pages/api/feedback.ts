export const prerender = false; // Not needed in 'server' mode
import { CommentSchema } from "@/consts";
import type { APIRoute } from "astro";
import { Comment, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const parsedData = CommentSchema.safeParse(data);

  if (!parsedData.success) {
    const fieldErrors: Record<string, string> = {};
    for (const error of parsedData.error.errors) {
      fieldErrors[error.path[0] as string] = error.message;
    }

    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: fieldErrors,
      }),
      { status: 400 }
    );
  }

  const { username, email, message, postSlug } = parsedData.data;

  const comment = await db
    .insert(Comment)
    .values({
      postSlug,
      email: email ?? null,
      username,
      message,
    } as typeof Comment.$inferInsert)
    .returning();

  return new Response(
    JSON.stringify({
      message: "Success!",
      comment: comment[0],
    }),
    { status: 200 }
  );
};
