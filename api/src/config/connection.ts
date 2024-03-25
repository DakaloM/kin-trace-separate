import dotenv from "dotenv";
import knex from "knex";
const knexfile = require("../../knexfile");
dotenv.config();

const db = knex(knexfile.development);
const allowedOrigin = [
  "http://footwear-dakalo-store.shop",
  "https://footwear-dakalo-store.shop",
  "http://localhost:3000",
  "http://localhost:3001",
];

export const serverConfig: ServerConfig = {
  port: Number(process.env.PORT),
  accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET as string,
  authSecret: process.env.AUTH_TOKEN_SECRET as string,
  allowedOrigin: allowedOrigin,
  dbUrl: process.env.DATABASE_URL as string,
  db: db,
  accessTokenExp: 60 * 60 * 60 * 24 * 30 * 1000,
  refreshTokenExp: 60 * 60 * 60 * 24 * 30 * 1000,
  authTokenExp: 60 * 60 * 60 * 30 * 1000,
};

type ServerConfig = {
  port: number;
  accessSecret: string;
  refreshSecret: string;
  authSecret: string;
  allowedOrigin: string[];
  dbUrl: string;
  db: typeof db;
  accessTokenExp: number;
  refreshTokenExp: number;
  authTokenExp: number;
};

export type DatabaseType = typeof db;
