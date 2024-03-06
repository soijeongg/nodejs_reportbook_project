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

//아이디 가지고 닉네임을 찾는 함수 
