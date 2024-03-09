import Joi from "joi"
import { deleteService, findCon, findid, getcommented, postcontentService, putCommentOne, putPageOne, putcommentSerivce } from "../Services/comment.serives.js";

//코멘트와 페이지를 위한 조이 스키마 
let CommentSchemas = Joi.object({
    comment: Joi.string().required()
})
let pageSchemas = Joi.object({
    page: Joi.number().required()
})

let commentIdSchmas = Joi.object({
  contentId: Joi.number().required(),
});

const BookIdScema = Joi.object({
  bookId: Joi.number().required(),
});

//여기서 중요한거 책아이디의 페이지를 따와서 그거보다 작아야 함

export const createCommentController  = async(req, res, next)=>{
    try{
    let {page, comment}  = req.body;
    let CommentValidation = CommentSchemas.validate({comment})
    if (CommentValidation.error){
        const error = new Error("코멘트의 형식이 틀렸습니다");
        error.status = 404;
        throw error;
    }
    let pagevaalid = pageSchemas.validate({page})
    if(pagevaalid.error){
        const error = new Error("페이지에는 숫자만 들어갈 수 있습니다")
        error.status = 404
        throw error
    }
    if(page<=0){
        const error = new Error("페이지에는 0보다 큰 숫자만 들어갈 수 있습니다");
        error.status = 404;
        throw error;
    }
    //책의 아이디를 보내 이걸로 페이지를 가져온다 findbook을 사용하자
    //이제 만들어야 하는대 유저아이디는 세션에서 가져오고 책 아이디는 파람에서 가져온다 
    let {bookId} = req.params
    const { UserId } = res.locals.user;
      let findbid = BookIdScema.validate({ bookId: Number(bookId) });
      if (findbid.error) {
        const error = new Error("책 아이디에는 숫자만 들어갈 수 있습니다");
        throw error;
      } 

    let postOne = await postcontentService(page, bookId, UserId, comment);
    if(!postOne){
        const error = new Error("등록에 실패했습니다 다시 한번 시도헤주세요")
        throw error
    }else{
        return res.status(200).json({message: "성공적으로 등록했습니다 "})
    }
}catch(error){
    next(error)
}
}

export const getcommentController = async(req, res, next)=>{
    try{
        let{bookId} = req.params;
        const { UserId } = res.locals.user;
        let findbid = BookIdScema.validate({bookId:Number(bookId)})
        if(findbid.error){
             const error = new Error(
               "책 아이디에는 숫자만 들어갈 수 있습니다"
             );
             throw error;
        } 
        let getOnes = await getcommented(bookId, UserId)
        if(!getOnes){
            const error = new Error("조회에 실패했습니다 다시 한번 시도헤주세요")
            throw error
        }
        return res.status(200).json({data:getOnes})
    }catch(error){
        next(error)
    }
}

//수정 지금 전부, 페이지만, 코멘트만 
export const putCommentController = async(req, res, next)=>{
    try{
    let{page,comment} = req.body;
    let {bookId,contentId} = req.params;
    let CommentValidation = CommentSchemas.validate({ comment });
    if (CommentValidation.error) {
    const error = new Error("코멘트의 형식이 틀렸습니다");
    error.status = 404;
    throw error;
    }
    let pagevaalid = pageSchemas.validate({ page });
    if (pagevaalid.error) {
    const error = new Error("페이지에는 숫자만 들어갈 수 있습니다");
    error.status = 404;
    throw error;
    }
    if (page <= 0) {
    const error = new Error("페이지에는 0보다 큰 숫자만 들어갈 수 있습니다");
    error.status = 404;
    throw error;
    }
    
    let commentIdvalidation = commentIdSchmas.validate({
      contentId: Number(contentId),
    });
    if(commentIdvalidation.error){
    const error = new Error("코멘트아이디는 숫자만 들어갈 수 있습니다");
    error.status = 404;
    throw error;
    }
      let findbid = BookIdScema.validate({ bookId: Number(bookId) });
      if (findbid.error) {
        const error = new Error("책 아이디에는 숫자만 들어갈 수 있습니다");
        throw error;
      } 
    const {UserId} = res.locals.user;
    let find = await findid(bookId,UserId)
    if(!find){
        const error = new Error("존재하지 않는 책입니다");
        error.status = 404;
        throw error;
    }
    let findCo = await findCon(contentId,UserId)
    if(!findCo){
        const error = new Error("존재하지 않는 글귀입니다");
        error.status = 404;
        throw error;
    }
    //전부있을때
    if(page,comment){
        let updateOne = await putcommentSerivce(page, comment, contentId);
        return res.status(200).json({ message: "성공적으로 수정되었습니다" });
    }
    else if(!page && comment){
        let updateComment = await putCommentOne(comment, contentId);
        return res.status(200).json({ message: "성공적으로 수정되었습니다" });
    }
    else if(page&&!comment){
        let updatepage = await putPageOne(page, contentId);
        return res.status(200).json({message:"성공적으로 수정되었습니다"})
    }
}catch(error){
    next(error)
}

}
//삭제 시 
export const deletecontentController = async(req, res, next)=>{
    try{
    let {bookId, contentId} = req.params;
    const { UserId } = res.locals.user;
    let findbid = BookIdScema.validate({ bookId: Number(bookId) });
    if (findbid.error) {
        const error = new Error("책 아이디에는 숫자만 들어갈 수 있습니다");
        throw error;
    } 
    let commentIdvalidation = commentIdSchmas.validate({
        contentId: Number(contentId),
    });
    if (commentIdvalidation.error) {
        const error = new Error("코멘트아이디는 숫자만 들어갈 수 있습니다");
        error.status = 404;
        throw error;
    }
    //일단 책 아이디와 유저 아이디가 있는지 확인
    let find = await findid(bookId, UserId);
    if (!find) {
      const error = new Error("존재하지 않는 책입니다");
      error.status = 404;
      throw error;
    }
    let findCo = await findCon(contentId, UserId);
    if (!findCo) {
      const error = new Error("존재하지 않는 글귀입니다");
      error.status = 404;
      throw error;
    }
    //여기까지 왔으면 다 확인하거 진짜 지우기
    let dele = await deleteService(contentId,UserId)
    if(!dele){
        const error = new Error("삭제에 실패했습니다")
        throw error
    }
    return res.status(200).json({message: "성공적으로 삭제했습니다"})
    }catch(error){
        next(error)
    }

}