import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.string("email").unique().notNullable();
    t.string("name").notNullable();
    t.string("surname").notNullable();
    t.string("password").notNullable();
    t.string("role").notNullable().defaultTo("Agent");
    t.string("status").notNullable().defaultTo("Active");
    t.string("gender").nullable();
    t.boolean("phoneVerified").notNullable().defaultTo(false);
    t.boolean("emailVerified").notNullable().defaultTo(false);
    t.string("contactNumber").unique().notNullable();
    t.string("image").nullable();
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
