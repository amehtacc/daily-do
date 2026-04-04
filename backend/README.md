# 📝 DailyDo Backend

A scalable and secure backend for a Todo application built with **Node.js, Express, PostgreSQL, and Prisma**.
This project includes authentication, authorization, and full CRUD operations with clean architecture and validation.

---

## 🚀 Features

* 🔐 JWT Authentication (Login / Signup / Logout)
* 🍪 Secure cookie-based session handling
* ✅ Protected routes with middleware
* 📦 Full CRUD for Todos
* 👤 User-based data isolation (multi-user support)
* 🧠 Input validation using Zod
* 🗄️ PostgreSQL with Prisma ORM
* ⚡ Clean architecture (Controller → Service → DB)

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (jsonwebtoken)
* **Validation:** Zod
* **Security:** bcrypt, cookie-parser

---

## 📂 Project Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│
├── server.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/amehtacc/daily-do/tree/main/backend
cd backend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
PORT=5000
CLIENT_URL="http://localhost:3000"
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

---

### 4️⃣ Run database migrations

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Start the server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

* User signs up → password hashed using bcrypt
* User logs in → JWT generated and stored in httpOnly cookie
* Protected routes → verified using auth middleware

---

## 📌 API Endpoints

### 🔹 Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/signin` | Login user    |
| POST   | `/api/auth/logout` | Logout user   |

---

### 🔹 Todo Routes (Protected)

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/todos`     | Get all todos |
| POST   | `/api/todos`     | Create todo   |
| PUT    | `/api/todos/:id` | Update todo   |
| DELETE | `/api/todos/:id` | Delete todo   |

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT stored in httpOnly cookies
* Signed cookies for tamper protection
* User-based access control (no cross-user access)

---

## 🧠 Key Learnings

* Building secure authentication systems
* Designing scalable REST APIs
* Handling validation and error management
* Structuring backend applications professionally

---

## 📈 Future Improvements

* Add refresh tokens
* Pagination for todos
* Rate limiting
* Docker support
* API documentation (Swagger)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.
