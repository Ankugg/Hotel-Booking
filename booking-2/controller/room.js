import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import CreateError from "../utills/error.js";
class roomController {
  static createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newwRoom = new Room(req.body);
    try {
      const savedRoom = await newwRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
  };

  static updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      next(error);
    }
  };

  static getRoom = async (req, res, next) => {
    try {
      const getRoom = await Room.find();

      res.status(200).json(getRoom);
    } catch (error) {
      next(error);
    }
  };

  static getRoomById = async (req, res, next) => {
    try {
      const getRoomById = await Room.findById(req.params.id);

      res.status(200).json(getRoomById);
    } catch (error) {
      next(error);
    }
  };

  static deleteRoom = async (req, res, next) => {
    try {
      await Room.findByIdAndDelete(req.params.id);

      res.status(200).jso("Room has been deleted");
    } catch (error) {
      next(error);
    }
  };
}
export default roomController;
