

export class bookService{
  constructor(bookRepository){
    this.bookRepository = bookRepository
  }


//title,  total_page,author,image,bookstatus가 들어왔을떄 create하자
createbookService = async (
  title,
  total_page,
  author,
  image,
  bookstatus,
  UserId
) => {
  //같은 제목이 있는 책은 두개 있을 수 있다 근데 책제목과 이미지가 같으면 안되는걸로 하자
  //이미지가 책 디자인인데 이건 다르니까
  let checktitle = await bookRepository.checktitleImage(title, image);
  if (checktitle!=null) {
    const error = new Error("중복된 책은 등록할 수 없습니다");
    error.status = 404;
    throw error;
  }
  //여기서 넘어오면 저장하자
  let createb = await bookRepository.createbook(
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
createbookServicenostatus = async (
  title,
  total_page,
  author,
  image,
  UserId
) => {
  //같은 제목이 있는 책은 두개 있을 수 있다 근데 책제목과 이미지가 같으면 안되는걸로 하자
  //이미지가 책 디자인인데 이건 다르니까
  let checktitle = await bookRepository.checktitleImage(title, image);
  if (checktitle) {
    const error = new Error("중복된 책은 등록할 수 없습니다");
    error.status = 404;
    throw error;
  }
  //여기서 넘어오면 저장하자
  let createb = await bookRepository. createbooknostatus(
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
getallbook = async (UserId) => {
  let allbooks = await bookRepository.allbook(UserId);
  return allbooks
};

putbookService = async (UserId, bookId, status, total_page) => {
  let putbooks = await bookRepository.findbook(UserId, bookId);
  if (!putbooks) {
    const error = new Error("존재하지 않는 책입니다.");
    error.status = 404;
    throw error;
  }
  let updatestatus = await bookRepository.putbook(status, bookId, total_page);
  return updatestatus;
};

putbooknostatuss = async (UserId, bookId, total_page) => {
  let putbooks = await bookRepository.findbook(UserId, bookId);
  if (!putbooks) {
    const error = new Error("존재하지 않는 책입니다.");
    error.status = 404;
    throw error;
  }

  let updatetotal = await bookRepository.putbooknostatus(bookId, total_page);
  return updatetotal;
};

 deletebookSerivce = async(bookId, UserId)=>{
  let findone = await bookRepository.findbook(UserId, bookId);
  if(!findone){
    const error = new Error("존재하지 않는 책입니다.");
    error.status = 404;
    throw error;
  }
  let deleteb = await bookRepository.deletebook(bookId, UserId);
  return deleteb

}
//delete 리프래시 토큰 세션이면 세션 키 받아서 지우기 db도 래디스 써서 리프래시 토큰 
}