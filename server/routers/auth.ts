import express from "express";
import auth from "../utils/authMiddleware";
import { loginController, verifyTokenController } from "../controllers/auth";

const router = express.Router();

router.post("/login", loginController);
// // @ts-ignore: Unreachable code error
router.get("/verify-token", auth, verifyTokenController as any);

export default router;
