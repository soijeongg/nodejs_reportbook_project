//여기가 책 등록 책 정보수정 책 정보 조회 책 조회 채 ㄱ삭제가 되는 곳

import express from "express";
import { postbookcontroller,getbookcontroller,updatebookcontoller } from "../controller/bookcontroller.js"
import authMiddleware from "../middlewares/authMiddleware.js";
let router = express.Router()


router.post("/",authMiddleware, postbookcontroller)
router.get("/", authMiddleware, getbookcontroller)
router.put("/:bookId",authMiddleware,updatebookcontoller)

export default router;