import express from "express"

import { protect } from "../middleware/auth.middleware.js"

import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher
} from "./teacher.controller.js"

const teacherRouter = express.Router()

teacherRouter
  .route("/")
  .post(/*protect,*/ createTeacher)
  .get(/*protect,*/ getTeachers)

teacherRouter
  .route("/:id")
  .get(/*protect,*/ getTeacher)
  .put(/*protect,*/ updateTeacher)
  .delete(/*protect,*/ deleteTeacher)

export default teacherRouter
