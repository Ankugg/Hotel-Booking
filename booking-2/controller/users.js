import User from "../models/auth.js";
import CreateError from "../utills/error.js";
class userController {
  static updateUser = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  static getUser = async (req, res, next) => {
    try {
      const getUser = await User.find();

      res.status(200).json(getUser);
    } catch (error) {
      next(error);
    }
  };

  static getUserById = async (req, res, next) => {
    try {
      const getUserById = await User.findById(req.params.id);

      res.status(200).json(getUserById);
    } catch (error) {
      next(error);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
