import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("notification", (t) => {
        t.uuid("id").primary().defaultTo(knex.fn.uuid());
        t.uuid('personId').unsigned().nullable();
        t.uuid('caseId').unsigned().nullable();
        t.uuid('taskId').unsigned().nullable();
        t.uuid('recepientId').unsigned();
        t.string('category').notNullable();
        t.text('message').notNullable();
        t.string('createdAt').notNullable().defaultTo(knex.fn.now());
        t.string('status').notNullable().defaultTo("New")
        t.foreign("personId").references("id").inTable("user");
        t.foreign("recepientId").references("id").inTable("user");
        t.foreign("caseId").references("id").inTable("case");
        t.foreign("taskId").references("id").inTable("task");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('notification')
}
