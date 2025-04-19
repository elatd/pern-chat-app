# Chat application

Building a feautre loaded real-time chat application.

## 📌 Description

A full-stack real-time chat application built with TypeScript, Socket.IO, and PostgreSQL using the PERN stack. It includes live messaging, typing indicators, online status, secure file sharing via AWS S3, and a clean modern UI built with TailwindCSS.

---

## 🚀 Features

- 💬 **Real-time messaging** with Socket.IO
- ✍️ **Typing indicators** to show when a user is composing
- 🟢 **Online user status** tracking in real time
- 📷 **Image sharing** with previews via AWS S3
- 📁 **Document & file sharing** with support for various file types
- 🎥 **Video playback** directly in chat
- 🔐 **Secure file access** via signed URLs
- 💡 **User authentication** with sessions and cookies
- 🧠 **Smart UI state management** with Zustand
- 📱 **Fully responsive interface** for mobile and desktop

---

## 🛠 Tech Stack

### **Frontend**

- ⚛️ React (with TypeScript)
- 🎨 Tailwind CSS
- 🚦 Zustand (for state management)
- ⚡ Vite
- 🔌 Socket.IO Client
- 🔐 Axios + Cookies for auth/session

### **Backend**

- 🟩 Node.js + Express.js (TypeScript)
- 💾 PostgreSQL with Prisma ORM
- 🔌 Socket.IO Server
- ☁️ AWS S3 (for file storage)
- 🔑 JWT/Session Authentication
- 🧰 ts-node, Nodemon, dotenv

---

## 📡 API Reference

### **Auth**

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login an existing user
- `GET /api/auth/logout` – Logout the current user

### **Messages**

- `POST /api/message/send/:receiverId` – Send message (text or file)
- `GET /api/message/:receiverId` – Get all messages with a user
- `GET /api/message/users` – Get users for sidebar (excluding self)

### **S3 (File Upload)**

- `POST /api/s3/upload-url` – Generate signed PUT URL for upload
- `GET /api/s3/view-url?key=fileKey` – Generate signed GET URL for preview

---

## 💻 How to Run Locally

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/pern-chat-app.git
cd pern-chat-app
```

### 2️⃣ Install Dependencies

```sh
# For backend
npm install

# For frontend
cd client
npm install

```

### 3️⃣ Set Up Environment Variables

Create a .env file in both server/ and client/ with values like:

```sh
# server/.env
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/chatdb
JWT_SECRET=supersecretkey
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=your-region
```

```sh
# client/.env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 4️⃣ Run the App

```sh
# In one terminal for backend
npm run dev

# In another terminal for frontend
cd client
npm run dev
```

### TODOS:

- [x] Integerate image sharing using S3 service.
- [ ] last message in conversations.
- [ ] Group chat.
- [ ] Push notification.
- [ ] Should integrate AI??
- [ ] Use Lambda to generate thumbnails or PDFs

## Glimpses:

![Homepage](./assets/Homescreen.png)
![Login](./assets/Login.png)
![Signup](./assets/Signup.png)

```

```
