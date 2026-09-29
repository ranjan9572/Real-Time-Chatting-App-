import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes.js";

export function createApp(io) {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL?.split(",").map((value) => value.trim()) || "*",
      methods: ["GET", "POST"],
      credentials: true
    })
  );

  app.use(express.json({ limit: "50kb" }));

  app.get("/health", (_req, res) => {
    res.json({
      success: true,
      service: "realtime-chat-backend",
      timestamp: new Date().toISOString()
    });
  });

  app.use((req, _res, next) => {
    req.io = io;
    next();
  });

  app.use("/api/messages", messageRoutes);

  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found."
    });
  });

  app.use((error, _req, res, _next) => {
    console.error("Unhandled API error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  });

  return app;
}
