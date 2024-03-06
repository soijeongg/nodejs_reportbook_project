//여기가 책 등록 책 정보수정 책 정보 조회 책 조회 채 ㄱ삭제가 되는 곳

import express from "express"
let router = express.Router()

router.get("/", bookcontroller)