import React from "react";
function formatTime(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateString));
}

export default function MessageBubble({ message, isMine }) {
  return (
    <div className={`message-row ${isMine ? "mine" : ""}`}>
      <article className="message-bubble">
        {!isMine && <div className="message-author">{message.username}</div>}
        <div className="message-text">{message.text}</div>
        <time>{formatTime(message.createdAt)}</time>
      </article>
    </div>
  );
}
