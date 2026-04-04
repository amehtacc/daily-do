import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import todoRoutes from "./src/routes/todoRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL].filter(
  Boolean,
);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// cookie parser
app.use(cookieParser(COOKIE_SECRET));

// Auth route
app.use("/api/auth", authRoutes);

// Todo route
app.use("/api/todos", todoRoutes);

// Health route
app.get("/api/health", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
