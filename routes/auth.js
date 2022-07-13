import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello buddy");
});

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/register", (req, res) => {
  res.send("Register");
});
export default router;
