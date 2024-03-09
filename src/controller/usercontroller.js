import Express from "express";
import Joi from "joi";
import { checkuserId, deleteUsers, updateNameSerives, updateNicknamePassword, updatePasswordSerives } from "../Services/user.serives.js";


export const changeid = async(req, res, next)=>{
    let {id,nickname, password}= req.body;
    //id는 검사용 바꿀꺼는 닉네임 패스워드 
    let {UserId} = res.local.user
    let findUid = checkuserId(id,UserId)
    //이게 넘어왔다는 것은 UserId와 id가 일치한다는 뜻
    //이제 들어온 값을 findUid를 기준으로 잡고 닉네임과 패스워드를 바꿔준다 
    if(nickname&&!password){
        let updaten = await updateNameSerives(nickname,id)
        res.status(200).json({message:"닉네임 성공적으로 수정했습니다"})
    }
    if(!nickname&&password){
        let updatePa = await updatePasswordSerives(password,id)
        res.status(200).json({ message: "닉네임 성공적으로 수정했습니다" });
    }
    if(nickname&&password){
        let updatenickpass = await updateNicknamePassword(nickname,password,id)
        res.status(200).json({ message: "닉네임 성공적으로 수정했습니다" });
    }


}

export const deleteU = async(req,res, next)=>{
    try{
  let { id } = req.body;
  let { UserId } = res.local.user;
  let findUid = checkuserId(id, UserId);
  //이게 넘어왔다는 것은 UserId와 id가 일치한다는 뜻
  //이제 삭제를 하자 
    await deleteUsers(id)
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/")
    }catch(error){
        next(error)
    }
}