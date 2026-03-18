import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/error.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// const corsOptions = {
//   origin: ["http://localhost:5173"],
//   credendials: true,
// };

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/", userRouter);

// Err Middlerware
app.use(errorHandler);

export default app;
