import { Router } from "express";

import { chatRouter } from "./chat.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/chat", chatRouter);

export const appRouter = router;
