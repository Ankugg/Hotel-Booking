import dotenv from "dotenv";
dotenv.config();
import User from "../models/auth.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import CreateError from "../utills/error.js";
class authController {
  static register = async (req, res, next) => {
    try {
      const { username, email, password, password_confirmation } = req.body;

      const user = await User.findOne({ username: username });

      if (!user) {
        if ((username && email, password && password_confirmation)) {
          if (password === password_confirmation) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              password_confirmation: password_confirmation,
            });
            await newUser.save();
            res.status(200).json("user has been created");
          } else {
            res
              .status(440)
              .send({ status: "failed", messgae: "password does not match" });
          }
        } else {
          res.send({ status: "failed", message: "all fields are required" });
        }
      } else {
        res.send({ status: "failed", message: "user already exist" });
      }
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
          next(CreateError(404, "User not found!"));
        }
        if (user != null) {
          const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
          );
          const token = Jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
          );
          if (!isPasswordCorrect)
            return next(CreateError(400, "wrong password or username"));

          if (user.username == username && password) {
            res.send({
              status: "success",
              message: "login successfully",
              token: token,
            });
          }
        } else {
          res.send({ status: "failed", message: "you are not register user" });
        }
      } else {
        res.send({ status: "failed", message: "all fields are require" });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default authController;
