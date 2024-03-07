
import {
  createbook,
  createbooknostatus,
  checktitleImage,
  allbook,
  puttitle,
  findbook
} from "../Repository/bookRepository.js";


//title,  total_page,author,image,bookstatus가 들어왔을떄 create하자
export let createbookService = async (
  title,
  total_page,
  author,
  image,
  bookstatus,
  UserId
) => {
  //같은 제목이 있는 책은 두개 있을 수 있다 근데 책제목과 이미지가 같으면 안되는걸로 하자
  //이미지가 책 디자인인데 이건 다르니까
  let checktitle = await checktitleImage(title, image);
  if (checktitle) {
    const error = new Error("중복된 책은 등록할 수 없습니다");
    error.status = 404;
    throw error;
  }
  //여기서 넘어오면 저장하자
  let createb = await createbook(
    title,
    total_page,
    author,
    image,
    bookstatus,
    UserId
  );
  if (!createb) {
    const error = new Error("등록에 실패했습니다 한번 더 시도해주세요");
    throw error;
  }
};

//title,  total_page,author,image,bookstatus가 들어왔을떄 create하자
export let createbookServicenostatus = async (
  title,
  total_page,
  author,
  image,
  UserId
) => {
  //같은 제목이 있는 책은 두개 있을 수 있다 근데 책제목과 이미지가 같으면 안되는걸로 하자
  //이미지가 책 디자인인데 이건 다르니까
  let checktitle = checktitleImage(title, image);
  if (checktitle == []) {
    const error = new Error("중복된 책은 등록할 수 없습니다");
    error.status = 404;
    throw error;
  }
  //여기서 넘어오면 저장하자
  let createb = await createbooknostatus(
    title,
    total_page,
    author,
    image,
    UserId
  );
  if (!createb) {
    const error = new Error("등록에 실패했습니다 한번 더 시도해주세요");
    throw error;
  }
};
//전부 조회하는 함수 
export let getallbook = async (UserId) => {
  let allbooks = await allbook(UserId);
  return allbooks
};

export const putbookService =async(UserId,bookId,title)=>{
    let putbook = await findbook(UserId,bookId);
    if(!putbook){
        const error = new Error("존재하지 않는 책입니다.")
        error.status  = 404
        throw error;
    }
    let updatetitle = await putbook(title, bookId)
    return updatetitle
}