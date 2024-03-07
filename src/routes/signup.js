import express from "express";

import authloginmiddleware from "../middlewares/authMiddleware.js";
import getsignupcontreoller from "../controller/signupcontroller.js"
let router = express.Router();

router.post("/",authloginmiddleware, getsignupcontreoller);





export default router;