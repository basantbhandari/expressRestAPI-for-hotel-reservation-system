import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
mongoose.connection.on("disconnected", connect);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);
app.use("/hotels", hotelsRoute);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(errorStatus).json({ message });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
