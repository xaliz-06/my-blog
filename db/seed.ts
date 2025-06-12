import { db, Comment } from "astro:db";

export default async function () {
  // Seed the database with initial comments
  const queries = [];

  for (let i = 0; i <= 4; i++) {
    queries.push(
      db.insert(Comment).values({
        postSlug: "first-post",
        username: "user" + i,
        email: "jamie@turso.tech",
        message: "Great post!",
      } as typeof Comment.$inferInsert)
    );
  }
  const [head, ...tail] = queries;
  if (head) {
    await db.batch([head, ...tail]);
  }
}
