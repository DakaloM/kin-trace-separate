import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("beneficiary", (t) => {
    t.uuid("id").primary().defaultTo(knex.fn.uuid());
    t.uuid("clientId").unsigned();
    t.string("name").notNullable();
    t.string("surname").notNullable();
    t.string("idNumber").notNullable();
    t.string("contactNumber").notNullable();
    t.string("traceStatus").notNullable().defaultTo("Untraced");
    t.string("gpsLocation").nullable();
    t.string("gender").nullable().defaultTo("Unspecified");
    t.string("image").nullable();
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.foreign("clientId")
      .references("id")
      .inTable("client")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("beneficiary");
}
