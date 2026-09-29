import React from "react";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./components/ChatHeader.jsx";
import MessageBubble from "./components/MessageBubble.jsx";
import MessageInput from "./components/MessageInput.jsx";
import { fetchMessages, sendMessage } from "./services/api.js";
import { socket } from "./services/socket.js";

const USERNAME_KEY = "realtime-chat-username";

export default function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem(USERNAME_KEY) || ""
  );
  const [draftUsername, setDraftUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    let active = true;

    async function loadHistory() {
      setLoading(true);
      try {
        const response = await fetchMessages();
        if (active) setMessages(response.data || []);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadHistory();

    function handleConnect() {
      setConnected(true);
      setError("");
      socket.emit("user:join", { username });
    }

    function handleDisconnect() {
      setConnected(false);
    }

    function handleMessage(message) {
      setMessages((current) => {
        if (current.some((item) => item.id === message.id)) return current;
        return [...current, message];
      });
    }

    function handleCount(count) {
      setOnlineCount(count);
    }

    function handleTyping(payload) {
      setTypingUser(payload.isTyping ? payload.username : "");
    }

    function handleSocketError(payload) {
      setError(payload?.message || "Socket error.");
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message:new", handleMessage);
    socket.on("user:count", handleCount);
    socket.on("typing:update", handleTyping);
    socket.on("socket:error", handleSocketError);

    if (!socket.connected) socket.connect();

    return () => {
      active = false;
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("message:new", handleMessage);
      socket.off("user:count", handleCount);
      socket.off("typing:update", handleTyping);
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  function login(event) {
    event.preventDefault();
    const value = draftUsername.trim();

    if (!value) {
      setError("Please enter a username.");
      return;
    }

    if (value.length > 30) {
      setError("Username must be 30 characters or fewer.");
      return;
    }

    localStorage.setItem(USERNAME_KEY, value);
    setUsername(value);
    setDraftUsername("");
    setError("");
  }

  function logout() {
    socket.disconnect();
    localStorage.removeItem(USERNAME_KEY);
    setUsername("");
    setMessages([]);
    setOnlineCount(0);
    setConnected(false);
  }

  async function handleSend(text) {
    try {
      setError("");
      await sendMessage(username, text);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleTypingStart() {
    if (!socket.connected) return;

    socket.emit("typing:start");

    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      socket.emit("typing:stop");
    }, 1200);
  }

  function handleTypingStop() {
    clearTimeout(typingTimerRef.current);
    if (socket.connected) socket.emit("typing:stop");
  }

  if (!username) {
    return (
      <main className="login-shell">
        <section className="login-card">
          <div className="logo">↗</div>
          <div className="eyebrow">SOCKET.IO • REAL-TIME</div>
          <h1>Welcome to Chat</h1>
          <p>
            Choose a username to join the room. This is dummy authentication
            for the assignment.
          </p>

          <form onSubmit={login} className="login-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={draftUsername}
              onChange={(event) => setDraftUsername(event.target.value)}
              placeholder="e.g. Bishwajeet"
              maxLength={30}
              autoFocus
            />
            <button type="submit">Join chat</button>
          </form>

          {error && <div className="error-banner">{error}</div>}
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="chat-card">
        <ChatHeader
          username={username}
          onlineCount={onlineCount}
          connected={connected}
        />

        <div className="toolbar">
          <span>
            {loading
              ? "Loading chat history..."
              : `${messages.length} messages loaded`}
          </span>
          <button className="ghost-button" onClick={logout}>
            Change user
          </button>
        </div>

        {error && <div className="error-banner inline">{error}</div>}

        <div className="messages-area">
          {messages.length === 0 && !loading ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h2>No messages yet</h2>
              <p>Send the first message and start the conversation.</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isMine={message.username === username}
              />
            ))
          )}

          {typingUser && typingUser !== username && (
            <div className="typing-indicator">
              <span className="typing-dots">
                <i />
                <i />
                <i />
              </span>
              {typingUser} is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <MessageInput
          onSend={handleSend}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
          disabled={!connected}
        />
      </section>
    </main>
  );
}
