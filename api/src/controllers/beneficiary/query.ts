import { Request, Response } from "express";
import { serverConfig } from "../../config/connection";

const db = serverConfig.db
export const getBeneficiaries = async (req: Request, res: Response) => {

    try {
        const beneficiaries = await db('beneficiary').orderBy("createdAt", "desc");
        return res.status(200).json(beneficiaries);
    } catch (error) {
        return res.status(500).json({ error, message: "failed to get beneficiaries" })
    }

}

export const getBeneficiary = async (req: Request, res: Response) => {

    const id = req.params.id

    try {
        const beneficiary = await db('beneficiary').where({id}).first();
        return res.status(200).json(beneficiary);
    } catch (error) {
        return res.status(500).json({ error, message: "failed to get beneficiary" })
    }

}