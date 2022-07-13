import jsonwebtoken from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies["access-token"];
  if (!token) {
    next(createError(401, "No token provided"));
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(createError(401, "Invalid token"));
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(createError(403, "Not authorized"));
  }
  next();
};
export const verifyUser = async (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    next();
  } else {
    next(createError(403, "Not authorized"));
  }
};
