import { findbook } from "../Repository/bookRepository.js"
import { createcomment, deleteComment, findContentId, getcomment,  putComment, putCommentPage, putPage } from "../Repository/commentRepository.js"


//create 먼저 검사하고 있으면 createcomment로 보낸다 
export const postcontentService = async(page, bookId, UserId, comment)=>{
    //일단 책아이디와 유저아이디가 같이 있는지 확인하자 
    let check = await findbook(bookId, UserId)
    if (!check){
        const error = new Error("존재하지 않는 책입니다.")
        error.status = 404
        throw error
    }
    if(check.total_page<page){
         const error = new Error("페이지는 책 전체 베이지 안의 숫자를 입력해주세요.");
         error.status = 404;
         throw error;
    }
    //이제 create
    let createOne = await createcomment(page, comment, UserId, bookId);
    return createOne
}
//get 함수 
export const getcommented  = async(bookId, UserId)=>{
    let getcomments = await getcomment(UserId, bookId)
    if(!getcomments){
        const error = new Error("조회에 실패했습니다")
        throw error
    }
    return getcomments
}
//put 함수 (다 있을때)
//책 아이디를 검색하기 
export const findid = async(bookId,UserId)=>{
    let findB = await findbook(bookId,UserId)
    return findB
}
//그 이후 컨텐츠 아이디를 검사
export const findCon = async(contentId,UserId)=>{
    let fiindCC = await findContentId(contentId,UserId)
    if (fiindCC) {
      const error = new Error("글귀가 존재하지 않습니다");
      error.status = 404;
      throw error;
    }
}

export const putcommentSerivce = async (page, comment, contentId) => {
  let putPC = await putCommentPage(comment, page, contentId);
  return putPC;
};
export const putCommentOne = async (comment, contentId) => {
  let putComments = await putComment(comment, contentId);
  return putComments;
};

export const putPageOne = async (page, contentId) => {
  let putP = await putPage(page, contentId);
  return putP;
};
//삭제하는 함수 구현
export const deleteService = async(bookId,contentId)=>{
    //먼저 책 이름
    let deletC = await deleteComment(bookId,UserId)
    return deletC
}