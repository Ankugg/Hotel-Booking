import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connect_db/connectDB.js";
import hotel from "./router/hotel.js";
import auth from "./router/auth.js";
import room from "./router/room.js";
import user from "./router/users.js";

const app = express();

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// DATABAE CONNECTION
connectDB(DATABASE_URL);

// Middleware
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/api", hotel);
app.use("/api", auth);
app.use("/api", room);
app.use("/api", user);
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
