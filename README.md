# Note App

## 📌 Overview

A simple and efficient Note App built with **MongoDB, Express.js, React.js + Vite, TypeScript and Node.js (MERN stack)**. This application allows users to create, read notes easily.

## 🚀 Features

- 📝 **Create Notes** – Add new notes with a title and content.
- 📖 **Read Notes** – View all saved notes.
- 🌐 **Responsive UI** – Works on all screen sizes.

## 🛠️ Tech Stack

### **Frontend:**

- React.js + Vite
- TypeScript
- Tailwind CSS

### **Backend:**

- Node + TypeScript
- Express
- MongoDB + Mongoose
- Redis

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest version)
- **MongoDB** (local or Atlas cloud database)

## ⚙️ Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/souravpl8092/fullstack_task_sourav.git
cd note-app
```

### **2. Setup Backend**

```sh
cd server
npm install
npm run dev
```

### **3. Setup Frontend**

```sh
cd client
npm install
npm run dev
```

### **4. Setup Environment Variables**

Create a `.env` file in the `backend` directory and add:

```sh
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

### **5. Run the Application**

#### Start the Backend:

```sh
cd backend
npm run dev
```

#### Start the Frontend:

```sh
cd frontend
npm run dev
```

---

The application will be available at **http://localhost:5174/**.

## 🌍 API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/fetchAllTasks | Get all notes     |
| POST   | /api/addTask       | Create a new note |

## 📂 Folder Structure

```
note-app/
│── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── index.ts
│   ├── mqtt.ts
│   ├── redis.ts
│
│── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│
│── README.md
│── package.json
```

## 📜 License

This project is licensed under the MIT License.

---

## Author

Developed by [Sourav Paul](https://github.com/souravpl8092) 🚀

---
