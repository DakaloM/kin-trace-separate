import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("session", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.uuid("userId")
      .unsigned()
      .unique()
      .references("id")
      .inTable("user")
      .notNullable()
      .onDelete("CASCADE");
    t.string("refreshToken").notNullable();
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("session");
}
