import "dotenv/config";
import http from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { registerSocketHandlers } from "./socket/socketHandler.js";

const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL.split(",").map((value) => value.trim()),
    methods: ["GET", "POST"]
  }
});

const app = createApp(io);
httpServer.on("request", app);

registerSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Allowed frontend origin: ${CLIENT_URL}`);
});
