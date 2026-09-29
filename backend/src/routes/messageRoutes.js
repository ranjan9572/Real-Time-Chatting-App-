import { Router } from "express";
import { fetchMessages, sendMessage } from "../controllers/messageController.js";

const router = Router();

router.get("/", fetchMessages);
router.post("/", sendMessage);

export default router;
