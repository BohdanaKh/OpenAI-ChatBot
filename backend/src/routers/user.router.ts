import { Router } from "express";

import {
  getAllUsers,
  logoutUser,
  userLogin,
  userSignup,
  verifyUser,
} from "../controllers";
import {
  loginValidator,
  signupValidator,
  validate,
  verifyToken,
} from "../utils";

const router = Router();

router.get("/", getAllUsers);
router.post("/signup", validate(signupValidator), userSignup);
router.post("/login", validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);
router.get("/logout", verifyToken, logoutUser);

export const userRouter = router;
