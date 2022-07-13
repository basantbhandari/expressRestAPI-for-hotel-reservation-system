import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumber: [
    {
      number: Number,
      unavailableDate: { type: [Date], default: [] },
    },
  ],

  photos: {
    type: [String],
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Room", RoomSchema);
