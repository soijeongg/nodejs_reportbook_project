import express from "express";
import Joi from "joi";
import authloginmiddleware from "../middlewares/authMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { changeid } from "../controller/usercontroller.js";
let router = express.Router();

router.put("/", authMiddleware,changeid)
    
















export default router;