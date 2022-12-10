import express from 'express'
import hotelController from '../controller/hotel.js'
import { verifyAdmin, verifyUser } from '../utills/verifyToken.js'

const router=express.Router()

router.post("/hotel",verifyAdmin, hotelController.createHotel)
router.put("/hotel/:id",verifyAdmin,hotelController.updateHotel)
router.get("/allhotel",hotelController.getHotel)
router.get("/allhotel/:id",hotelController.getHotelById)
router.delete("/hotel/:id",hotelController.deleteHotel)



router.get("/countbycity",hotelController.countByCity)
router.get("/countbytype",hotelController.countByType)





export default router