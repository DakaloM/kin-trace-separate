import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("task", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.uuid("createdBy").unsigned();
    t.uuid("assignedTo").unsigned();
    t.uuid("caseId").unsigned().nullable();
    t.string("createdAt").notNullable().defaultTo(knex.fn.now());
    t.string("taskMessage").notNullable();
    t.string("status").notNullable().defaultTo("Open");
    t.foreign("createdBy").references("id").inTable("user");
    t.foreign("assignedTo").references("id").inTable("user");
    t.foreign("caseId").references("id").inTable("case").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("task");
}
