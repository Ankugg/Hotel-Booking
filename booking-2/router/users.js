import express from "express";
import userController from "../controller/users.js";
import verifyToken, { verifyAdmin, verifyUser } from "../utills/verifyToken.js";

const router = express.Router();


router.put("/user/:id",verifyUser, userController.updateUser);
router.get("/alluser",verifyToken, userController.getUser);
router.get("/alluser/:id", userController.getUserById);
router.delete("/user/:id",verifyUser, userController.deleteUser);

export default router;
