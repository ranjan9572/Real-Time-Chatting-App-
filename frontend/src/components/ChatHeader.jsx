import React from "react";
export default function ChatHeader({ username, onlineCount, connected }) {
  return (
    <header className="chat-header">
      <div>
        <div className="eyebrow">REAL-TIME CHAT</div>
        <h1>Chat Room</h1>
        <p className="subline">
          Signed in as <strong>{username}</strong>
        </p>
      </div>

      <div className="presence">
        <span className={`status-dot ${connected ? "online" : ""}`} />
        <div>
          <strong>{connected ? "Connected" : "Reconnecting..."}</strong>
          <span>{onlineCount} online</span>
        </div>
      </div>
    </header>
  );
}
