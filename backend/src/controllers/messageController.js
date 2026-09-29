import { createMessage, getMessages } from "../services/messageService.js";

export async function fetchMessages(req, res) {
  try {
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(requestedLimit, 1), 200)
      : 100;

    const messages = await getMessages(limit);

    return res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error("Fetch messages error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch chat history."
    });
  }
}

export async function sendMessage(req, res) {
  try {
    const { username, text } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof text !== "string" ||
      !username.trim() ||
      !text.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Username and message text are required."
      });
    }

    if (username.trim().length > 30) {
      return res.status(400).json({
        success: false,
        message: "Username must be 30 characters or fewer."
      });
    }

    if (text.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message must be 1000 characters or fewer."
      });
    }

    const message = await createMessage({ username, text });

    // Broadcast only after successful persistence.
    req.io.emit("message:new", message);

    return res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message."
    });
  }
}
