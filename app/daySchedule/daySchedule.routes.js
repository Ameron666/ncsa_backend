import express from "express"

import { protect } from "../middleware/auth.middleware.js"

import {
  createDaySchedule,
  deleteDaySchedule,
  getDaySchedule,
  getDaySchedules,
  updateDaySchedule
} from "./daySchedule.controller.js"

const dayScheduleRouter = express.Router()

dayScheduleRouter
  .route("/")
  .post(/*protect,*/ createDaySchedule)
  .get(/*protect,*/ getDaySchedules)

dayScheduleRouter
  .route("/:id")
  .get(/*protect,*/ getDaySchedule)
  .put(/*protect,*/ updateDaySchedule)
  .delete(/*protect,*/ deleteDaySchedule)

export default dayScheduleRouter
