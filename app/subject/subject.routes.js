import express from "express"
import { protect } from "../middleware/auth.middleware.js"

import {
  createSubject,
  deleteSubject,
  getSubject,
  getSubjects,
  updateSubject
} from "./subject.controller.js"

const router = express.Router()

router.route("/").post(/*protect,*/ createSubject).get(/*protect,*/ getSubjects)

router
  .route("/:id")
  .get(/*protect,*/ getSubject)
  .put(/*protect,*/ updateSubject)
  .delete(/*protect,*/ deleteSubject)

export default router
