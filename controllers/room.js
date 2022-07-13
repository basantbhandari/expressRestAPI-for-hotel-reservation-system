import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  const hotelID = req.params.hotelID;
  try {
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
    try {
      await Hotel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(createError(error.status, error.message));
    }
    res.status(201).json(savedRoom);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.send(room);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (err) {
    next(createError(err.status, err.message));
  }
};
