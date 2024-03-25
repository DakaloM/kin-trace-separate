import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const beneficiaryTableExist = await knex.schema.hasTable("beneficiary");
  if (beneficiaryTableExist) {
    return knex.schema.createTable("address", (t) => {
      t.uuid("id").primary().defaultTo(knex.fn.uuid());
      t.uuid("refId").notNullable();
      t.string("type").notNullable();
      t.string("streetAddress").notNullable();
      t.string("city").notNullable();
      t.string("zipCode").notNullable();
      t.string("gpsLocation").nullable();
      t.string("country").notNullable();
      t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("address");
}
