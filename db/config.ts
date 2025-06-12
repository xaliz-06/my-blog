import { defineDb, defineTable, column } from "astro:db";

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    postSlug: column.text(),
    username: column.text(),
    email: column.text({ optional: true }),
    message: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

export default defineDb({
  tables: { Comment },
});
