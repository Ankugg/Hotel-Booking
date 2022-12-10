import express from 'express'
import roomController from '../controller/room.js'
import { verifyAdmin } from '../utills/verifyToken.js'

const router=express.Router()

router.post("/room/:hotelid",verifyAdmin, roomController.createRoom)
router.put("/room/:id",verifyAdmin,roomController.updateRoom)

router.get("/allroom",verifyAdmin,roomController.getRoom)
router.get("/allroom/:id",roomController.getRoomById)
router.delete("/room/:id",roomController.deleteRoom)

export default router