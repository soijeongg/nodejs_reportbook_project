import express from "express";

import authloginmiddleware from "../middlewares/authMiddleware.js";
import getsignincontreoller from "../controller/signincontroller.js";
let router = express.Router();

router.post("/", getsignincontreoller);

export default router;
