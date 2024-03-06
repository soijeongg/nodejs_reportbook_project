import  Express  from "express";
import Joi from "joi";
import {sginupserivce} from "../Services/user.serives.js"


const idSchema = Joi.string().min(3).max(20).required();
const passwordSchema = Joi.object({
  password: Joi.string().min(5).max(15).invalid(Joi.ref("id")).alphanum().required(),
});
const nicknameSchema = Joi.object({
  nickname: Joi.string().min(2).max(20).required(),
});



//회원 가입
 const getsignupcontreoller = async(req, res, next)=>{
    try{
        let { id, password, nickname } = req.body;
        
        console.log(id)
        const idvalidation = idSchema.validate(id);
        if(idvalidation.error){
            const error = new Error("아이디 형식이 맞지 않습니다")
            error.status = 400
            throw error
        }
        const passwordvalidation = passwordSchema.validate({password});
        if (passwordvalidation.error) {
          const error = new Error("비밀번호  형식이 맞지 않습니다");
          error.status =400;
          throw error;
        }
        const nicknamevalidation = nicknameSchema.validate({nickname});
        if (nicknamevalidation.error) {
          const error = new Error("닉네임 형식이 맞지 않습니다");
           error.status = 400;
          throw error;
        }
        const message = await sginupserivce(id, password,nickname)
        res.status(200).json({messages: `${nickname}님 안녕하세요` })
    }
    catch(error){
        next(error)
    }
}
export default getsignupcontreoller