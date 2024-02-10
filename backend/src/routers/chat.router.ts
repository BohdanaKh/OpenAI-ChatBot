import { Router } from "express";
import {chatController} from "../controllers/chat.controller";

const router = Router();

router.get("/", chatController.findAll);

export const chatRouter = router;