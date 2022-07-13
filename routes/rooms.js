import express from "express";
const router = express.Router();
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "../controllers/room.js";

// create a new room
router.post("/create", createRoom);

// update a room
router.put("/update/:id", updateRoom);

// delete a room
router.delete("/delete/:id", deleteRoom);

// get a room
router.get("/:id", getRoom);

// get all rooms
router.get("/", getRooms);

export default router;
