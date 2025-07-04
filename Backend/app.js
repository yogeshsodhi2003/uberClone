import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routers/user.routes.js";
import captainRoutes from "./routers/captain.routes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("uber");
});
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);

export default app;