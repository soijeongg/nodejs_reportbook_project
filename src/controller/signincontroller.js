import Express from "express";
import Joi from "joi";
import { sgininservice } from "../Services/user.serives.js";

const idSchema = Joi.string().min(3).max(20).required();
const passwordSchema = Joi.object({
  password: Joi.string()
    .min(5)
    .max(15)
    .invalid(Joi.ref("id"))
    .alphanum()
    .required(),
});


//로그인
const getsignincontreoller = async (req, res, next) => {
  try {
    let { id, password } = req.body;
    const idvalidation = idSchema.validate(id);
    if (idvalidation.error) {
      const error = new Error("아이디 형식이 맞지 않습니다");
      error.status = 400;
      throw error;
    }
    const passwordvalidation = passwordSchema.validate({ password });
    if (passwordvalidation.error) {
      const error = new Error("비밀번호  형식이 맞지 않습니다");
      error.status = 400;
      throw error;
    }
    const message = await sgininservice(id, password);
    const [nickname, UserId] = message.split(",");

    //UserId를 찾아 그걸 이용해 세션을 만들자 
     req.session.userId = UserId;
    res
      .status(200)
      .json({ messages: `${nickname}님 안녕하세요` });
  } catch (error) {
    next(error);
  }
};
export default getsignincontreoller;
