import express from "express"

import { protect } from "../middleware/auth.middleware.js"

import {
  createGroupSchedule,
  deleteGroupSchedule,
  getGroupSchedule,
  getGroupSchedules,
  updateGroupSchedule
} from "./groupSchedule.controller.js"

const groupScheduleRouter = express.Router()

groupScheduleRouter
  .route("/")
  // .post(/*protect,*/ createGroupSchedule)
  .put(/*protect,*/ updateGroupSchedule)
  .get(/*protect,*/ getGroupSchedules)

groupScheduleRouter
  .route("/:id")
  .get(/*protect,*/ getGroupSchedule)
  // .put(/*protect,*/ updateGroupSchedule)
  .delete(/*protect,*/ deleteGroupSchedule)

export default groupScheduleRouter
