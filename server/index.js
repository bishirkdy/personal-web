import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from '../server/routers/userRouter.js';
import projectRouter from '../server/routers/projectRouter.js';
import paymentRouter from '../server/routers/paymentRouter.js';
import aiPromptsRouter from '../server/routers/aiProjectRouter.js';
const app = express();
const PORT = process.env.PORT || 3000;

import { connectDB } from './db/mongoDB.js';
const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/ai', aiPromptsRouter);
connectDB()

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1); // Exit the process with a failure code
  });
  
  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // Exit the process with a failure code
  });


app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})