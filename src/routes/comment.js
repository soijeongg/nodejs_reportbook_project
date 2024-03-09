import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import { createCommentController, deletecontentController, getcommentController, putCommentController } from "../controller/contentcontroller.js";

let router = express.Router()

router.post("/:bookId/comment", authMiddleware,createCommentController)
router.get("/:bookId/comment",authMiddleware, getcommentController);
router.put("/:bookId/comment/:contentId",authMiddleware,putCommentController)
router.delete("/:bookId/comment/:contentId", authMiddleware, deletecontentController);

export default router