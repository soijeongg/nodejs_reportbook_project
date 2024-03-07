import express from "express"
import userrouter from "./userrouter.js"
import signuprouter from "./signup.js"
import signinrouter from "./login.js"
import bookrouter from "./book.js"

const router = express.Router()
router.use("/user", userrouter)
router.use("/sign-up", signuprouter)
router.use("/sign-in", signinrouter)
router.use("/book", bookrouter)

export default router;

