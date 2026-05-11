import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/error.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";
import companyRouter from "./routes/companyRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import jobRouter from "./routes/jobRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.set("query parser", "extended");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/candidate", profileRouter);
app.use("/api/company", companyRouter);
app.use("/api/category", categoryRouter);
app.use("/api/jobs", jobRouter);

// Err Middlerware
app.use(errorHandler);

export default app;
