import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jsonwebtoken from "jsonwebtoken";

export const register = async (req, res, next) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    timeStamp: req.body.timeStamp,
    isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      next(createError(404, "User not found"));
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      next(createError(404, "Password is incorrect"));
    }
    const token = jsonwebtoken.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
