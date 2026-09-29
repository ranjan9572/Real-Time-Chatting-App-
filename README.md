# Real-Time Chat Application

A full-stack real-time chat application built with **React + Vite** on the frontend and **Node.js + Express + Socket.io** on the backend.

## Features

### Required
- Send messages
- Receive messages instantly with Socket.io
- Fetch previous messages after refresh
- Message timestamps
- REST API for sending and fetching messages
- Socket.io broadcast for real-time delivery
- Graceful connection/disconnection handling
- Clean project structure
- API and Socket error handling

### Bonus
- Dummy username login
- Typing indicator
- Online user count/status
- Message persistence in a local JSON datastore
- Responsive chat UI

> The JSON datastore is intentionally used to keep setup simple and portable. It can be replaced by MongoDB, PostgreSQL, SQLite, etc. without changing the frontend contract.

## Project Structure

```text
realtime-chat-app/
├── backend/
│   ├── data/
│   │   └── messages.json
│   ├── src/
│   │   ├── controllers/
│   │   │   └── messageController.js
│   │   ├── routes/
│   │   │   └── messageRoutes.js
│   │   ├── services/
│   │   │   └── messageService.js
│   │   ├── socket/
│   │   │   └── socketHandler.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+

## 1. Run the Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend:
- REST API: `http://localhost:5000/api`
- Health check: `http://localhost:5000/health`
- Socket.io: `http://localhost:5000`

For production:

```bash
npm start
```

## 2. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start:

```bash
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

Open the app in two browser tabs/windows with different usernames to test real-time chat.

## REST API

### Health

```http
GET /health
```

### Fetch chat history

```http
GET /api/messages?limit=100
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "username": "Alice",
      "text": "Hello",
      "createdAt": "2026-08-09T15:00:00.000Z"
    }
  ]
}
```

### Send message

```http
POST /api/messages
Content-Type: application/json

{
  "username": "Alice",
  "text": "Hello!"
}
```

The backend persists the message and broadcasts:

```text
message:new
```

through Socket.io.

## Socket Events

### Client → Server

- `user:join`
- `typing:start`
- `typing:stop`

### Server → Client

- `user:count`
- `user:list`
- `user:joined`
- `user:left`
- `message:new`
- `typing:update`
- `socket:error`

## Design Decisions

1. **REST + Socket.io separation**
   - REST handles persistence and history.
   - Socket.io handles real-time events.
   - This keeps responsibilities clear.

2. **Single message creation path**
   - The frontend sends a message through `POST /api/messages`.
   - The backend saves it first.
   - Only after successful persistence does the backend emit `message:new`.
   - This prevents clients from displaying messages that failed to save.

3. **Socket.io is mandatory**
   - No polling or Firebase is used for real-time delivery.

4. **Reusable React components**
   - Header, message bubble and input are separate components.

5. **Environment variables**
   - Frontend and backend URLs are configurable without modifying source code.

6. **Simple persistence**
   - Messages are stored in `backend/data/messages.json`.
   - This makes the submission runnable immediately without installing a database server.

## Assumptions

- This is a single public chat room.
- Authentication is intentionally dummy username-based login.
- There is no password or production identity verification.
- The JSON datastore is suitable for this assignment/demo, not for high-concurrency production use.
- The latest 100 messages are loaded initially.
- A username is stored in browser localStorage.

## Error Handling

- REST validation errors return HTTP 400.
- Unexpected REST errors return HTTP 500.
- Socket connection errors are surfaced to the client.
- Invalid socket events are rejected safely.
- JSON storage failures are caught and returned as API errors.

## Testing

Recommended manual test:

1. Start backend.
2. Start frontend.
3. Open two browser tabs.
4. Enter different usernames.
5. Send a message from tab A.
6. Verify tab B receives it instantly.
7. Refresh tab B.
8. Verify the message is still visible.
9. Start typing in one tab.
10. Verify the other tab displays the typing indicator.
11. Close one tab and verify the online count changes.

## Deployment

The backend can be deployed to Render, Railway, Fly.io, or another Node.js host.

For a production deployment:
- Replace JSON storage with a real database.
- Configure `CLIENT_URL` to the deployed frontend.
- Configure `VITE_API_URL` and `VITE_SOCKET_URL` to the deployed backend.
- Use HTTPS/WSS.
- Add real authentication and rate limiting.

