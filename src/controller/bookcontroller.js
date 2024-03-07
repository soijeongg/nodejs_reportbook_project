import Joi from "joi";
import {
  createbookService,
  createbookServicenostatus,
  getallbook,
  putbookService,
} from "../Services/book.serives.js";

export const postbookcontroller = async(req, res, next)=>{
    try{
    let { title, total_page, author, image, bookstatus } = req.body;
    //만약 0보다 작을 시 책 페이지는 0보다 작을 수 없다 반환
    if(total_page<0){
        const error = new Error("책 페이지는 0보다 적을 수 없습니다.");
        error.status = 404;
        throw error;
    }
  
    //상태 있을시 서비스에 넘겨 레포지토리와 접속한다 
    if (bookstatus) {
       const UserId = req.session.userId;
      const createbooks = createbookService(
        title,
        total_page,
        author,
        image,
        bookstatus,
        UserId
      );
    }
      else {
         const UserId = req.session.userId;
        const createbooks = createbookServicenostatus(
          title,
          total_page,
          author,
          image,
          UserId
        );
      }
      res.status(200).json({message : "정상적으로 등록되었습니다"})
    }catch(error){
        next(error)
    }
    }

export const getbookcontroller = async(req, res, next)=>{
    const UserId = req.session.userId;
    const getallbooks = await getallbook(UserId)
    res.status(200).json({data:getallbooks})
}
export const updatebookcontoller = async(req, res, next)=>{
    let{title} = req.body;
    let{bookId} = req.params;
    const UserId = req.session.userId;
    const updateOne = await putbookService(UserId,bookId,title)
    if(!updateOne){
        const error = new Error("업데이트에 실패했습니다 다시 시도해주세요")
        throw error
    }
}




