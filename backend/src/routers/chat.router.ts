import { Router } from "express";

import {
  deleteUserChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat.controller";
import { chatCompletionValidator, validate, verifyToken } from "../utils";

const router = Router();

router.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion,
);
router.get("/all-chats", verifyToken, sendChatsToUser);
router.delete("/delete", verifyToken, deleteUserChats);

export const chatRouter = router;
