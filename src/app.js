import express from "express"
import dotenv from "dotenv"
import authMiddleware from "./middlewares/authMiddleware.js"
import GernalerrorMiddleware from "./middlewares/GernalerrorMiddleware.js";
import authloginmiddleware from "./middlewares/authloginmiddleware.js";
import norouterMiddleware from "./middlewares/norouterMiddleware.js";
import logMiddleware from "./middlewares/logmiddleware.js";
import routes from "./routes/index.js" 

dotenv.config()
app = express()
let PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use("/api", routes);
app.use(norouterMiddleware)
app.use(GernalerrorMiddleware);


app.get("/", async(req, res)=> {
    res.send("<h1>열심히하자..</h1>")
})

app.listen(PORT, ()=>{
    console.log(PORT, "로 연결 되었습니다")
})