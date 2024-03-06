import express from "express";
import Joi from "joi";
import authloginmiddleware from "../middlewares/authMiddleware.js";
let router = express.Router();

router.post("/", async(req, res, next)=>{
    let {id, nickname, password} = req.body;
    







})









export default router;