import { Router } from "express";
import {getAllUsers, userLogin, userSignup} from "../controllers";
import {loginValidator, signupValidator, validate} from "../utils";



const router = Router();

router.get("/", getAllUsers );
router.post("/signup", validate(signupValidator), userSignup );
router.post("/login", validate(loginValidator), userLogin );

export const userRouter = router;