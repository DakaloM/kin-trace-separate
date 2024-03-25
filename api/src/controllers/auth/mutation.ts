import { Request, Response } from "express";
import { serverConfig } from "../../config/connection";
import dotenv from "dotenv";
import * as argon from "argon2";
import jwt from "jsonwebtoken";

const db = serverConfig.db
dotenv.config();

const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // find the user with the email
    const user = await db("user").where({ email }).first();

    if (!user) {
        return res.status(404).json({ message: "Account not found" });
    }

    // verify the password
    const passwordVerified = await argon.verify(user.password, password);
    if (!passwordVerified) {
        return res.status(404).json({ message: "Invalid login credentials" });
    }

    //JWT
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        accessSecret,
        { expiresIn: "20d" },
    );

    const refreshToken = jwt.sign(
        {
            id: user.id,
        },
        refreshSecret,
        { expiresIn: "60d" },
    );
    try {
        const session = await db("session")
            .insert({
                userId: user.id,
                refreshToken: refreshToken,
            })
            .onConflict("userId")
            .merge();

        // return data
        const { password, ...others } = user;
        res.status(200).json({
            user: {
                id: user.id,
                role: user.role,
                accessToken,
                refreshToken,
            },
            message: "Login successful",
        });
    } catch (error) {
        return res.status(500).json({ message: "failed to create session" });
    }

}

export const refreshToken = async (req: Request, res: Response) => {

    const { id, token } = req.body;

    // find the user with the id
    const user = await db("user").where({ id }).first();
    if (!user) {
        return res.status(404).json({ message: "Account not found" });
      }

    // find session with refresh token and id
    const session = await db("session")
      .where({ userId: id, refreshToken: token })
      .first();
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    jwt.verify(token, refreshSecret, (err: any, data: any) => {
        if (err)
          return res.status(403).json({
            message:
              err.message === "jwt expired" ? "Token expired " : "Token invalid ",
          });
      });
      
     //JWT
     const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        accessSecret,
        { expiresIn: "15m" },
      );
  
      const refreshToken = jwt.sign(
        {
          id: user.id,
        },
        refreshSecret,
        { expiresIn: "60d" },
      );

      try {
        const session = await db("session")
          .insert({
            userId: user.id,
            refreshToken: refreshToken,
          })
          .onConflict("userId")
          .merge();
  
        // return data
  
        res.status(200).json({
          payload: {
            id: user.id,
            accessToken,
            refreshToken,
          },
          message: "New accessToken created",
        });
      } catch (error) {
        return res.status(500).json({ message: "failed to create session" });
      }

}