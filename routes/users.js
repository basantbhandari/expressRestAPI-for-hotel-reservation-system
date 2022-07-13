import express from "express";
const router = express.Router();
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// import all controllers from user.js
import {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

// create a new user
router.post("/register", register);

// login a user
router.post("/login", login);

// get a user
router.get("/:id", verifyUser, getUser);

// get all users
router.get("/", verifyAdmin, getUsers);

// update a user
router.put("/update/:id", verifyUser, updateUser);

// delete a user
router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
