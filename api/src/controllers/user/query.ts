import { Request, Response } from "express";
import { serverConfig } from "../../config/connection";

const db = serverConfig.db
export const getCases = async (req: Request, res: Response) => {

    console.log("here")

    try {
        const cases = await db('case').orderBy("createdAt", "desc");
        return res.status(200).json(cases);
    } catch (error) {
        return res.status(500).json({ error, message: "failed to get cases" })
    }

}

export const getUserCases = async (req: Request, res: Response) => {

    const id = req.params.id

    // get user
    const user = await db('user').where({ id }).first();
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    try {
        const cases = await db('case').where({ agentId: id }).orWhere({ createdBy: id }).orWhere({ supervisorId: id }).orderBy("createdAt", "desc");
        return res.status(200).json(cases);
    } catch (error) {
        return res.status(500).json({ message: "failed to get cases" })
    }

}