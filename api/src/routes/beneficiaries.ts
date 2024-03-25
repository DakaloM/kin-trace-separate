import express from "express"
import { getCases, getUserCases } from "../controllers/case/query";
import { getBeneficiaries, getBeneficiary } from "../controllers/beneficiary/query";


const router = express.Router();

router.route("/").get(getBeneficiaries)


router.route("/:id").get(getBeneficiary)


export default router