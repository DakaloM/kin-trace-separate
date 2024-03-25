import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("location", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.uuid("userId").unsigned();
    t.uuid("caseId").unsigned();
    t.string("createdAt").notNullable().defaultTo(knex.fn.now());
    t.string("longitude").notNullable();
    t.string("latitude").notNullable();
    t.foreign("userId").references("id").inTable("user");
    t.foreign("caseId").references("id").inTable("case");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("location");
}
