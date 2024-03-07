import { prisma } from "../utils/prisma/index.js"


//이미지와 제목 두개를 줬을때 
export let checktitleImage = async (title, image)=>{
    let findtitle = await prisma.books.findMany({
        where:{
            title:title,
            image:image
        }
    })
    return findtitle;
};

//이제 저장을하자 
export let createbook = async (
  title,
  total_page,
  author,
  image,
  bookstatus,
  UserId
) => {
  let makebook = await prisma.books.create({
    data: { title, total_page, author, image, bookstatus, UserId: +UserId },
  });
  return makebook;
};

export let createbooknostatus = async (title, total_page, author, image, UserId) => {
  let makebook = await prisma.books.create({
    data: { title, total_page, author, image, UserId: +UserId },
  });
  return makebook;
};


//전부 조회 근데 userId가 지금의 세션에 있는것만 UserId
export let allbook  = async(UserId)=>{
    let all = await prisma.books.findMany({
      where: { UserId: +UserId },
    });
return all
}

//수정할꺼야 그러면 일단 들어온 북아이디와 유저 아이디를 검색해 있으면 해야지 그리고 있으면 수정하는거 
//수정은 title, total_page, author, image로
//들어온 아이디들을 이용해 찾는 함수 
export const findbook = async(bookId, UserId)=>{
    let findids = await prisma.books.findMany({
        where: {bookId: bookId, UserId: UserId}
    })
}
//수정하는 함수 
export const puttitle = async(title,bookId)=>{
    let updatename = await prisma.books.update({
        data:{title},
        where:{bookId:bookId}
    })
    return updatename
}