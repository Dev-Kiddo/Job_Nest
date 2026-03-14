import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/error.js";

const app = express();

app.use(errorHandler);

export default app;
