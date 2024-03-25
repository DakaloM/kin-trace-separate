import { Request, Response } from "express";
import { serverConfig } from "../../config/connection";

const db = serverConfig.db
export const getAddress = async (req: Request, res: Response) => {

    const id = req.params.id

    try {
        const address = await db('address').where({id}).first();
        return res.status(200).json(address);
    } catch (error) {
        return res.status(500).json({ error, message: "failed to get address" })
    }

}

export const getAddressByRefId = async (req: Request, res: Response) => {

    const id = req.params.id
    

    try {
        const address = await db('address').where({refId: id}).first();
        return res.status(200).json(address);
    } catch (error) {
        return res.status(500).json({ message: "failed to get address" })
    }

}
