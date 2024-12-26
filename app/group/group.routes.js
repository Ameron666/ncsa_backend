import express from "express"
import { protect } from "../middleware/auth.middleware.js"

import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup
} from "./group.controller.js"

const groupRouter = express.Router()

groupRouter
  .route("/")
  .post(/*protect,*/ createGroup)
  .get(/*protect,*/ getGroups)

groupRouter
  .route("/:id")
  .get(/*protect,*/ getGroup)
  .put(/*protect,*/ updateGroup)
  .delete(/*protect,*/ deleteGroup)

export default groupRouter
