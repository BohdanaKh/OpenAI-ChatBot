import { Router } from "express";
import {chatCompletionValidator, validate, verifyToken} from "../utils";
import {generateChatCompletion} from "../controllers/chat.controller";

const router = Router();

router.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);

export const chatRouter = router;