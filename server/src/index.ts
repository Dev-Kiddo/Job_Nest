import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/error.js";
import authRouter from "./routes/authRoute.js";

const app = express();

// Middlewares
app.use(express.json());

// ROUTES
app.use("/api/auth", authRouter);

// Err Middlerware
app.use(errorHandler);

export default app;
