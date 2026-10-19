<!-- ===================== HEADER ===================== -->
<div align="center">

# 💬 Real-Time Chat App

**A full-stack chat application with instant messaging, live presence, and typing indicators.**

Built with React, Node.js, Express, and Socket.IO.

<p>
  <a href="https://real-time-chatting-app-krtt.onrender.com/health"><strong>🩺 Backend Health</strong></a>
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

Real-Time Chat App is a responsive, browser-based chat application where users join with a username and exchange messages instantly. It combines a **REST API** for message history and persistence with **Socket.IO** for live message delivery and presence updates. The currently linked Render service is the **backend API**; its root URL does not serve the React interface, so opening it directly returns `Route not found`. The backend health endpoint is linked above. Add the frontend’s public URL here once the frontend is deployed.

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

Example request body:

```json
{
  "username": "Alice",
  "text": "Hello everyone!"
}
```

## 🔄 How It Works

1. The user joins the chat with a username.
2. The frontend fetches recent messages from the Express REST API.
3. When a user sends a message, the backend validates and saves it.
4. After the save succeeds, Socket.IO broadcasts the new message to connected clients.
5. Socket events also update typing indicators and online presence.

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

[Backend Health](https://real-time-chatting-app-krtt.onrender.com/health) · [GitHub Repository](https://github.com/ranjan9572/Real-Time-Chatting-App-)

</div>
