import { Knex } from "knex";
import * as argon from "argon2";
import dotenv from "dotenv";
import { clients } from "@e-trace/data";

dotenv.config();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("client").del();

  // Inserts seed entries
  await knex("client").insert([...clients]);
}
