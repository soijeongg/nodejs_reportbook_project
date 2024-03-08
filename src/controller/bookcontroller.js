import Joi from "joi";
import {
  createbookService,
  createbookServicenostatus,
  deletebookSerivce,
  getallbook,
  putbookService,
  putbooknostatuss
} from "../Services/book.serives.js";
const statusSchema = Joi.object({
  status: Joi.string().valid("READING", "DONE").required(),
});
const pageStatus = Joi.object({
  total_page:Joi.number().required(),
})
const BookIdScema = Joi.object({
  bookId: Joi.number().required(),
});

export const postbookcontroller = async(req, res, next)=>{
    try{
    let { title, total_page, author, image, bookstatus } = req.body;
     let pagevalidation = pageStatus.validate({ total_page });
     if (pagevalidation.error) {
       const error = new Error("페이지는 숫자만 입력할 수 있습니다");
       error.status = 404;
       throw error;
     }
    //만약 0보다 작을 시 책 페이지는 0보다 작을 수 없다 반환
    if(total_page<0){
        const error = new Error("책 페이지는 0보다 적을 수 없습니다.");
        error.status = 404;
        throw error;
    }
  
    //상태 있을시 서비스에 넘겨 레포지토리와 접속한다 
    if (bookstatus) {
       const UserId = req.session.userId;
      const createbooks =await  createbookService(
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
        const createbooks =await createbookServicenostatus(
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
  try{
    let{total_page,status} = req.body;
    let pagevalidation = pageStatus.validate({total_page})
    if(pagevalidation.error){
      error  = new Error("페이지는 숫자만 입력할 수 있습니다")
      error.status = 404
      throw error;
    }
    if(status){
    let statusValidation = statusSchema.validate({status });
    if(statusValidation.error){
      return res.status(404).json({message:"상태는 오직 READING과 DONE만이 들어갈 수 있습니다 이 둘을 써주시거나 비워주세요"})
    }}
    let{bookId} = req.params;
    let bookIdvalidation = BookIdScema.validate({bookId})
    if(bookIdvalidation.error){
      const error = new Error("책 아이디는 숫자만 입력할 수 있습니다")
      error.status = 404
      throw error
    }
    const UserId = req.session.userId;
    if(status){
    const updateOne = await putbookService(UserId,bookId,status,total_page)
    if(!updateOne){
        const error = new Error("업데이트에 실패했습니다 다시 시도해주세요")
        throw error
    }}
    else{
    const updateOne = await putbooknostatuss(UserId, bookId, total_page)
    if(!updateOne){
      const error = new Error("업데이트에 실패했습니다 다시 시도해주세요");
      throw error;

    }
  }
    return res.status(200).json({message: "성공적으로 수정했습니다"})
  }catch(error){
    next(error)
  }
}

export const deletebookContoller = async(req, res, next)=>{
  try{
  const{bookId} = req.params
   let bookIdvalidation = BookIdScema.validate({ bookId });
   if (bookIdvalidation.error) {
     const error = new Error("책 아이디는 숫자만 입력할 수 있습니다");
     error.status = 404;
     throw error;
   }
  const UserId = req.session.userId;
  let deletOne = await deletebookSerivce(bookId, UserId)
  if(!deletOne){
    const error = new Error("삭제에 실패했습니다 다시 시도해주세요");
    throw error;
  }
  return res.status(200).json({mesage:"성공적으로 삭제했습니다"})
}catch(error){
  next(error)
}
}




