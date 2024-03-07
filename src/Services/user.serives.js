//로그인 해주는 서비스 단 필요한거 아이디 검색 -> 없으면 아이디, 닉네임, 비밀번호로create
import { checkId}  from "../Repository/userRepository.js"
import {createUser}  from "../Repository/userRepository.js";
import bcrypt from "bcrypt";

export const sginupserivce =async(id, password, nickname)=>{
    //아이디 중복체크 
    let checkid = await checkId(id)
    if (checkid) {
      const error = new Error("아이디가 이미 존재합니다 ");
      error.status = 404;
      throw  error();
    }
    //중복이 없으니 회원가입 진행 
    let createuser = await createUser(id, password, nickname)
    if(!createuser){
        const error = new Error("회원가입에 실패했습니다 다시 시도해주세요");
        error.status = 500;
        throw  error();
    }
    return createuser

}

//로그인 해주는 서비스단 로그인에 필요한거 들어온 아이디를 체크하고 그 후 비밀번호 체크
//다 맞으면 세션을 사용해보자  세션에 아이디를 저장해보자!
export const sgininservice = async(id, password)=>{
  //아이디 확인
  let checkid = await checkId(id);
    if (!checkid || checkid.id !== id) {
      const error = new Error("아이디가 존재하지 않습니다 ");
      error.status = 404;
      throw error();
    }
   let checkpasswords = await bcrypt.compare(password, checkid.password);
  if (!checkpasswords) {
    const error = new Error("비밀번호가 맞지 않습니다 ");
    error.status = 404;
    throw error();
  }
  return `${checkid.nickname},${checkid.UserId}`;

}


