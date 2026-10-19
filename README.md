<!-- ===================== HEADER ===================== -->
<div align="center">

# 💬 Real-Time Chat App

**A full-stack chat application with instant messaging, live presence, and typing indicators.**

Built with React, Node.js, Express, and Socket.IO.

<p>
  <a href="https://real-time-chatting-app-1-1ihg.onrender.com"><strong>🚀 Live Demo</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/ranjan9572/Real-Time-Chatting-App-"><strong>📂 Source Code</strong></a>
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white)

</div>

---

## ✨ Overview

Real-Time Chat App is a responsive, browser-based chat application where users join with a username and exchange messages instantly. It combines a **REST API** for message history and persistence with **Socket.IO** for live message delivery and presence updates. The frontend is deployed on Render and can be opened using the **Live Demo** link above. The backend health endpoint is also linked above for a quick service check.

## 🌟 Features

| Feature | What it does |
|---|---|
| ⚡ **Instant messaging** | Broadcasts new messages to connected users with Socket.IO |
| 💬 **Chat history** | Loads recent messages when the chat opens and after refresh |
| ⌨️ **Typing indicator** | Shows when another connected user is typing |
| 🟢 **Online presence** | Displays connection status and online user count |
| 👤 **Username entry** | Join with a username and switch users when needed |
| 🕒 **Message timestamps** | Shows the time each message was sent |
| 📱 **Responsive UI** | Mobile layout tested at approximately 367 × 666 px |
| 🛡️ **Validation & errors** | Validates message input and handles API/socket errors |

## 🧰 Tech Stack

**Frontend**  
React · Vite · JavaScript · CSS

**Backend**  
Node.js · Express.js · REST API

**Real-time communication**  
Socket.IO · socket.io-client

**Storage & deployment**  
JSON file datastore · Render

## 🖥️ Run Locally

### Requirements

- Node.js **20.19+** (or **22.12+**)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/ranjan9572/Real-Time-Chatting-App-.git
cd Real-Time-Chatting-App-
```

### 2. Start the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

The backend starts at `http://localhost:5000`.

### 3. Start the frontend

Open a **second terminal** from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start Vite:

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

### 4. Try the chat

Open the app in two browser tabs, join with different usernames, and send a message. Check that messages appear instantly in both tabs, typing indicators update, and the online count changes when a tab disconnects.

## 🔌 API Reference

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check backend status |
| `GET` | `/api/messages?limit=100` | Retrieve recent messages |
| `POST` | `/api/messages` | Validate and save a message, then broadcast it |

**Example: fetch recent messages**

```http
GET /api/messages?limit=100
```

A successful response contains the messages returned by the API. A message has this general shape:

```json
{
  "id": "message-id",
  "username": "Alice",
  "text": "Hello everyone!",
  "createdAt": "2026-08-09T15:00:00.000Z"
}
```

**Example: send a message**

```http
POST /api/messages
Content-Type: application/json
```

```json
{
  "username": "Alice",
  "text": "Hello everyone!"
}
```

The backend validates the request, saves the message, and then emits `message:new` to connected clients. Exact response wrappers and error messages are determined by the API implementation.

## 🔄 How It Works

1. The user joins the chat with a username.
2. The frontend fetches recent messages from the Express REST API.
3. When a user sends a message, the backend validates and saves it.
4. After the save succeeds, Socket.IO broadcasts the new message to connected clients.
5. Socket events also update typing indicators and online presence.

## 🔌 Socket.IO Events

Socket.IO carries real-time updates between connected clients and the backend. The app uses events for joining, online presence, message delivery, and typing status.

| Direction | Event | Purpose |
|---|---|---|
| Client → Server | `user:join` | Register a username for the chat session |
| Client → Server | `typing:start` | Notify the server that a user started typing |
| Client → Server | `typing:stop` | Notify the server that a user stopped typing |
| Server → Client | `user:count` | Update the number of connected users |
| Server → Client | `user:list` | Share the current online user list |
| Server → Client | `user:joined` | Announce a user joining |
| Server → Client | `user:left` | Announce a user leaving |
| Server → Client | `message:new` | Deliver a newly saved message |
| Server → Client | `typing:update` | Update typing status |
| Server → Client | `socket:error` | Report a socket-level error |

## 🧠 Design Decisions

- **REST API for history and persistence:** HTTP endpoints load recent messages and create new ones.
- **Socket.IO for live updates:** connected clients receive new messages and presence/typing changes without polling.
- **One message creation path:** the frontend posts a message to the API; the backend saves it before broadcasting `message:new`. This avoids broadcasting a message when persistence fails.
- **Reusable React components:** the interface separates the chat header, message display, and message input into focused components.
- **Environment-based configuration:** frontend API and socket URLs are configured through environment variables instead of hard-coded deployment URLs.
- **Simple JSON storage:** the project is easy to run locally without installing a separate database. For production use, a managed database and persistent storage are recommended.

## 🧪 Manual Testing Checklist

Use two browser tabs or windows with different usernames:

1. Confirm both users can join the chat.
2. Send a message from one tab and verify it appears in the other immediately.
3. Refresh the second tab and verify recent messages load again.
4. Start and stop typing in one tab and check the typing indicator in the other.
5. Close one tab and verify the online count updates.
6. Try an empty message and confirm it is handled safely.

## 🗂️ Project Structure

```text
.
├── backend/
│   ├── data/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── socket/
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── App.jsx
│       └── styles.css
└── README.md
```

## 📌 Notes

- This project uses a **single public chat room** and username-based entry; it does not implement production authentication.
- Messages are stored in a local JSON file. For a production-scale application, use a managed database and configure persistent storage for the deployment environment.
- The mobile layout has already been tested; this README does not treat it as a pending task.

---

<div align="center">

**Built by [Ranjan Kumar Yadav](https://github.com/ranjan9572)**

[🚀 Live Demo](https://real-time-chatting-app-1-1ihg.onrender.com) · [GitHub Repository](https://github.com/ranjan9572/Real-Time-Chatting-App-)

</div>
