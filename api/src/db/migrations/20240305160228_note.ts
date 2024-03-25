import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("note", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.uuid("userId").unsigned();
    t.uuid("caseId").unsigned().nullable();
    t.uuid("taskId").unsigned().nullable();
    t.string("createdAt").notNullable().defaultTo(knex.fn.now());
    t.string("message").notNullable();
    t.string("status").notNullable().defaultTo("Created")
    t.foreign("userId").references("id").inTable("user");
    t.foreign("caseId").references("id").inTable("case");
    t.foreign("taskId").references("id").inTable("task");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("note");
}
