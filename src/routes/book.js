//여기가 책 등록 책 정보수정 책 정보 조회 책 조회 채 ㄱ삭제가 되는 곳

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { prisma } from '../utils/prisma/index.js';
import { bookRepository } from '../Repository/bookRepository.js';
import { bookService } from '../Services/book.serives.js';
import { bookcontroller } from '../controller/bookcontroller.js';

let router = express.Router();
// 3계층의 의존성을 모두 주입합니다.
const BookRepository = new bookRepository(prisma);
const BookService = new bookService(BookRepository);
const Bookcontroller = new bookcontroller(BookService);



router.post('/', authMiddleware, Bookcontroller.postbookcontroller);
router.get('/', authMiddleware, Bookcontroller.getbookcontroller);
router.put('/:bookId', authMiddleware, Bookcontroller.updatebookcontoller);
router.delete('/:bookId', authMiddleware, Bookcontroller.deletebookContoller);

export default router;