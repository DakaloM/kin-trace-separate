import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("client", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.string("employeeNumber").unique().notNullable();
    t.uuid('createdBy').unsigned().nullable();
    t.string("name").notNullable();
    t.string("surname").notNullable();
    t.string("idNumber").unique().notNullable();
    t.string("gender").nullable();
    t.string("passportNumber").nullable();
    t.string("country").notNullable();
    t.string("contactNumber1").unique().notNullable();
    t.string("contactNumber2").unique().nullable();
    t.string("image").nullable();
    t.foreign("createdBy").references("id").inTable("user");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("client");
}
