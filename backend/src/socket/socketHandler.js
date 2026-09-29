const users = new Map();

function emitPresence(io) {
  const userList = [...users.entries()].map(([socketId, username]) => ({
    socketId,
    username
  }));

  io.emit("user:count", userList.length);
  io.emit("user:list", userList);
}

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("user:join", (payload) => {
      const username =
        typeof payload?.username === "string" ? payload.username.trim() : "";

      if (!username || username.length > 30) {
        socket.emit("socket:error", {
          message: "A valid username is required."
        });
        return;
      }

      users.set(socket.id, username);
      socket.data.username = username;

      socket.broadcast.emit("user:joined", {
        username
      });

      emitPresence(io);
    });

    socket.on("typing:start", () => {
      const username = socket.data.username;
      if (!username) return;

      socket.broadcast.emit("typing:update", {
        username,
        isTyping: true
      });
    });

    socket.on("typing:stop", () => {
      const username = socket.data.username;
      if (!username) return;

      socket.broadcast.emit("typing:update", {
        username,
        isTyping: false
      });
    });

    socket.on("disconnect", (reason) => {
      const username = users.get(socket.id);
      users.delete(socket.id);

      if (username) {
        socket.broadcast.emit("user:left", { username });
      }

      emitPresence(io);
      console.log(`Socket disconnected: ${socket.id} (${reason})`);
    });
  });
}
