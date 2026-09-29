import React from "react";
import { useState } from "react";

export default function MessageInput({ onSend, onTypingStart, onTypingStop, disabled }) {
  const [text, setText] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setText(value);

    if (value.trim()) {
      onTypingStart();
    } else {
      onTypingStop();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const value = text.trim();
    if (!value || disabled) return;

    await onSend(value);
    setText("");
    onTypingStop();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        maxLength={1000}
        disabled={disabled}
        rows={1}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Send
      </button>
    </form>
  );
}
