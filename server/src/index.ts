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
import applicationRouter from "./routes/applicationRoute.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.set("query parser", "extended");

app.use(express.urlencoded({ extended: true }));

console.log("CLIENT's URL:", process.env.CLIENT_URL, process.env.CLIENT_LOCAL_URL);

const allowedOrigins = [process.env.CLIENT_URL, process.env.CLIENT_LOCAL_URL];

app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/application", applicationRouter);

// Err Middlerware
app.use(errorHandler);

export default app;
