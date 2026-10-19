# Real-Time Chat Application

A full-stack chat application built with **React, Vite, Node.js, Express, and Socket.IO**. Users can join with a username, exchange messages in real time, see online connection counts, and view typing indicators.

**Live Demo:** https://real-time-chatting-app-krtt.onrender.com  
**Source Code:** https://github.com/ranjan9572/Real-Time-Chatting-App-

## Features

- **Real-time messaging** using Socket.IO.
- **Message history** loaded from the REST API when the chat opens.
- **Message persistence** using a local JSON datastore.
- **Username-based entry** with the option to change user.
- **Online user count** and connection status.
- **Typing indicators** for other connected users.
- **Message timestamps** and distinct styling for your own messages.
- **REST API** for fetching and sending messages.
- **Input validation and error handling** on the API and client.
- **Responsive interface** with mobile layout tested at approximately 367 × 666 pixels.

> **Project scope:** This demo uses a single public chat room and a username rather than production authentication. The JSON file datastore keeps local setup simple; a production deployment should use a managed database and real authentication.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express |
| Real-time communication | Socket.IO, socket.io-client |
| HTTP API | REST, Fetch API |
| Message storage | JSON file |
| Deployment | Render |

## Project Structure

```text
.
├── backend/
│   ├── data/
│   │   └── messages.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 18 or newer
- npm

### 1. Clone the repository

```bash
git clone https://github.com/ranjan9572/Real-Time-Chatting-App-.git
cd Real-Time-Chatting-App-
```

### 2. Configure and start the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory using `.env.example` as a reference:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend runs at `http://localhost:5000`. The health endpoint is `http://localhost:5000/health`.

### 3. Configure and start the frontend

Open a second terminal from the repository root:

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

Open the local URL printed by Vite (usually `http://localhost:5173`).

### 4. Test real-time chat

Open the app in two browser tabs or windows and join with different usernames. Send a message from one tab and confirm it appears in the other. You can also test the typing indicator, online count, and message history after refreshing.

## REST API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `GET` | `/api/messages?limit=100` | Fetch recent messages |
| `POST` | `/api/messages` | Validate, store, and broadcast a message |

Example request body for `POST /api/messages`:

```json
{
  "username": "Alice",
  "text": "Hello!"
}
```

The API validates required fields and length limits. Successfully stored messages are broadcast to connected clients using the `message:new` Socket.IO event.

## Socket.IO Events

| Direction | Events |
|---|---|
| Client → Server | `user:join`, `typing:start`, `typing:stop` |
| Server → Client | `user:count`, `user:list`, `user:joined`, `user:left`, `message:new`, `typing:update`, `socket:error` |

## Architecture Notes

- REST endpoints handle message creation and chat-history retrieval.
- The backend stores a message before broadcasting it, so failed writes are not broadcast as successful messages.
- Socket.IO handles live message delivery, typing updates, and online connection counts.
- The frontend uses reusable components for the chat header, message bubbles, and message input.
- Frontend service URLs are configurable with environment variables.

## Responsive Testing

The mobile layout has been tested at approximately **367 × 666 pixels**. The chat header, messages, message input, **Send** button, and **Change user** control fit within the tested viewport.

## Deployment Notes

The application is deployed on Render. The live link is at the top of this README.

For a more production-ready version, consider moving message storage from the JSON file to a managed database, adding real authentication and rate limiting, and configuring persistent storage appropriate to the hosting platform.

## Author

**Ranjan Kumar Yadav**  
GitHub: [@ranjan9572](https://github.com/ranjan9572)
