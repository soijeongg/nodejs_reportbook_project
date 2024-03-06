import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
export default async function (req, res, next) {
  try {
    const { userId } = req.session;
    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });
    if (!user) throw new Error("토큰 사용자가 존재하지 않습니다.");

    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie(logintoocookie); // 인증에 실패하였을 경우 Cookie를 삭제합니다.
    console.error(error);
    return res.status(403).json({
      errorMessage: "로그인에 실패하였습니다.",
    });
  }
}
