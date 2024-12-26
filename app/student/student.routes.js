import express from "express"
import { protect } from "../middleware/auth.middleware.js"

import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent
} from "./student.controller.js"

const studentRouter = express.Router()

studentRouter
  .route("/")
  .post(/*protect,*/ createStudent)
  .get(/*protect,*/ getStudents)

studentRouter
  .route("/:id")
  .get(/*protect,*/ getStudent)
  .put(/*protect,*/ updateStudent)
  .delete(/*protect,*/ deleteStudent)

export default studentRouter
