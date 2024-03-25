import express from "express"
import { getCases, getUserCases } from "../controllers/case/query";
import { getAddress, getAddressByRefId } from "../controllers/address/query";


const router = express.Router();

router.route("/:id").get(getAddress)


router.route("/ref/:id").get(getAddressByRefId)



export default router