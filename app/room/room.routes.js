import express from "express"
import { protect } from "../middleware/auth.middleware.js"

import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom
} from "./room.controller.js"

const roomRouter = express.Router()

roomRouter.route("/").post(/*protect,*/ createRoom).get(/*protect,*/ getRooms)

roomRouter
  .route("/:id")
  .get(/*protect,*/ getRoom)
  .put(/*protect,*/ updateRoom)
  .delete(/*protect,*/ deleteRoom)

export default roomRouter
