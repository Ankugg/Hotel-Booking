import dotenv from "dotenv";
dotenv.config();
import Jwt from "jsonwebtoken";
import CreateError from "../utills/error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(CreateError(401, "you are not authenticated"));
  }
  Jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) {
      return next(CreateError(403, "token is not valid"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(CreateError(403, "you are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(CreateError(403, "you are not authorized"));
    }
  });
};

export default verifyToken;
