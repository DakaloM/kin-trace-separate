import express from "express"
import { getCases, getUserCases } from "../controllers/case/query";
import { login, refreshToken } from "../controllers/auth/mutation";


const router = express.Router();

router.route("/login").post(login)


router.route("/refreshToken").post(refreshToken)


export default router