import { Knex } from "knex";
import * as argon from "argon2";
import dotenv from "dotenv";
import { users } from "@e-trace/data";

dotenv.config();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user").del();

  const userList: {
    password: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    gender: string;
    contactNumber: string;
    image: string;
  }[] = [];
  
  for (const user of users) {
    const newUser = {
      ...user,
      password: await argon.hash(user.password),
    };
    userList.push(newUser);
  }

  console.log(userList);

  // Inserts seed entries
  await knex("user").insert([...userList]);
}
