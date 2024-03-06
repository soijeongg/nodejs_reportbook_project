import express from "express"
import dotenv from "dotenv"
import authMiddleware from "./middlewares/authMiddleware.js"
import GernalerrorMiddleware from "./middlewares/GernalerrorMiddleware.js";
import norouterMiddleware from "./middlewares/norouterMiddleware.js";
import logMiddleware from "./middlewares/logmiddleware.js";
import expressSession from "express-session";
import routes from "./routes/index.js" 

dotenv.config()
const app = express()
let PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use(
  expressSession({
    secret: process.env.JWT_SECRET, // 세션을 암호화하는 비밀 키를 설정
    resave: false, // 클라이언트의 요청이 올 때마다 세션을 새롭게 저장할 지 설정, 변경사항이 없어도 다시 저장
    saveUninitialized: false, // 세션이 초기화되지 않았을 때 세션을 저장할 지 설정
    cookie: {
      // 세션 쿠키 설정
      maxAge: 1000 * 60 * 60 * 24, // 쿠키의 만료 기간을 1일로 설정합니다.
    },
  })
);
app.use("/api", routes);

app.get("/", async(req, res)=> {
    res.send("<h1>열심히하자..</h1>")
})
app.use(norouterMiddleware);
app.use(GernalerrorMiddleware);

app.listen(PORT, ()=>{
    console.log(PORT, "로 연결 되었습니다")
})