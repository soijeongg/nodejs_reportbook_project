import { prisma } from "../utils/prisma/index.js"

//먼저 레파지토리부터 시작 post부터 하자 
//등록하는 함수 우선 첵 아이디가 있는지 확인해야 한다 이건 북레포지토리 사용
//그러면 등록하는 함수  들어올거 페이지 코멘트 유저 아이디, 북 아이디
export const createcomment =async (page, comment, UserId, bookId)=>{
    UserId = Number(UserId);
    bookId = Number(bookId)
    let createOne = await prisma.contents.create({
        data:{page, comment, UserId, bookId}
    })
    return createOne
}
//전부 보여주는 get함수 만들자 근데 여기서 필요한게 유저아이디와 책 아이디
export const getcomment = async(UserId, bookId)=>{
 
    let getOne = await prisma.contents.findMany({
        where:{UserId:+UserId , bookId: +bookId}
    })
    return getOne
}

//수정하기 수정할것은 패이지,코멘트 페이지 코멘트 둘다 페이지 하나 코멘트 하나
export const putPage = async (page, contentId) => {
  let changePage = await prisma.contents.update({
    data: { page },
    where: { contentId: +contentId },
  });
  return changePage;
};

export const putComment = async (comment, contentId) => {
  let changeComment = await prisma.contents.update({
    data: { comment },
    where: { contentId: +contentId },
  });
  return changeComment;
};

export const putCommentPage = async (comment, page, contentId) => {
  let changePageComment = await prisma.contents.update({
    data: { page, comment },
    where: { contentId: +contentId },
  });
  return changePageComment;
};

//자 마지막으로 삭제하는 거 
export const deleteComment = async (contentId,UserId) => {
  let deleteC = await prisma.contents.delete({
    where:{contentId:+contentId, UserId:+UserId}
  })
return deleteC;
};

//컨텐츠 아이디 검사 
export const findContentId = async(contentId,UserId)=>{
  let findC = await prisma.contents.findFirst({
    where:{contentId:+contentId,UserId:+UserId}
  })
  return findC
}