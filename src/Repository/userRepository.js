import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt"
//아이디 중복확인 해주는 함수

export const checkId  = async(id)=>{
    let checkid = await prisma.users.findFirst({
        where:{id:id}
    })
    return checkid;
}
//회원가입 하는 함수 
export const createUser = async(id, password, nickname) =>{
    let hashpassword = await  bcrypt.hash(password,10)
    let create = await prisma.users.create({
      data: {
        id,
        password: hashpassword,
        nickname,
      },
    });
    return create
}

//들어온 아이디를 가지고 유저 아이디를 검색한다 그걸 리턴
export const findRealId = async(id)=>{
  let findd = await prisma.users.findFirst({
    where:{id:id}
  })
  return findd
}
//닉네임과 id들어올시 바꿔주기

export const  updateName = async(nickname, id)=>{
  let updateNick = await prisma.users.update({
    data:{nickname},where:{id:id}
  })
  return updateNick
}

export const updatePassword = async(password, id)=>{
  let updatePass = await prisma.users.update({
    data:{password},where:{id:id}
  })
  return updatePass
}

export const updatePasswordNickname = async(nickname, password,id)=>{
  let updateNickPass= await prisma.users.update({
    data:{nickname, password},
    where:{id:id}
  })
  return updateNickPass
}

export const deleteUser = async(id)=>{
  let deletename = await prisma.users.delete({
    where:{id:id}
  })
  return deletename;
}