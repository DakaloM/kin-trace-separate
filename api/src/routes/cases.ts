import express from "express"
import { getCases, getUserCases } from "../controllers/case/query";


const router = express.Router();

router.route("/").get(getCases)


router.route("/user/:id").get(getUserCases)



export default router