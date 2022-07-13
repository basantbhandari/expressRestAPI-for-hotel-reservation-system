import express from "express";
const router = express.Router();
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// import all controllers from hotel.js
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";

// create a new hotel
router.post("/create", verifyAdmin, createHotel);

// update a hotel
router.put("/update/:id", verifyAdmin, updateHotel);

// delete a hotel
router.delete("/delete/:id", verifyAdmin, deleteHotel);

// get a hotel
router.get("/:id", getHotel);

// get all hotels
router.get("/", getHotels);

export default router;
