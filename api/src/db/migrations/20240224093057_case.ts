import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("case", (t) => {
        t.uuid("id").primary().defaultTo(knex.fn.uuid());
        t.uuid("createdBy").unsigned();
        t.uuid("supervisorId").unsigned();
        t.uuid("agentId").unsigned();
        t.uuid("clientId").unsigned();
        t.string('caseNumber').notNullable();
        t.string("createdAt").notNullable().defaultTo(knex.fn.now());
        t.string("duration").notNullable();
        t.uuid("beneficiaryId").unsigned();
        t.string("status").notNullable().defaultTo("Open");
        t.string("city").notNullable();
        t.text("comment").nullable();
        t.string("completionDate").nullable();
        t.string("traceStatus").notNullable().defaultTo("Untraced"),
        t.foreign("beneficiaryId").references("id").inTable("beneficiary");
        t.foreign("createdBy").references("id").inTable("user");
        t.foreign("agentId").references("id").inTable("user");
        t.foreign("supervisorId").references("id").inTable("user");
        t.foreign("clientId").references("id").inTable("client");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("case");
}
