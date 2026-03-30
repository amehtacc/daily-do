import 'dotenv/config'; 
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from "./src/routes/authRoutes.js"
import todoRoutes from "./src/routes/todoRoutes.js"

const app = express()

const PORT = process.env.PORT
const COOKIE_SECRET = process.env.COOKIE_SECRET

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// cookie parser
app.use(cookieParser(COOKIE_SECRET))

// Auth route
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))