import Hotel from "../models/hotel.js";
import CreateError from "../utills/error.js";
class hotelController {
  static createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (error) {
      next(error);
    }
  };

  static updateHotel = async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (error) {
      next(error);
    }
  };

  static getHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const getHotel = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max | 999 },
      }).limit(req.query.limit);

      res.status(200).json(getHotel);
    } catch (error) {
      next(error);
    }
  };

  static getHotelById = async (req, res, next) => {
    try {
      const getHotelById = await Hotel.findById(req.params.id);

      res.status(200).json(getHotelById);
    } catch (error) {
      next(error);
    }
  };

  static deleteHotel = async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);

      res.status(200).jso("hotel has been deleted");
    } catch (error) {
      next(error);
    }
  };

  static countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  static countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villasCount = await Hotel.countDocuments({ type: "villa" });
      const cottageCount = await Hotel.countDocuments({ type: "cottage" });

      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "partments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villasCount },
        { type: "cottages", count: cottageCount },
      ]);
    } catch (error) {
      next(error);
    }
  };
}

export default hotelController;
