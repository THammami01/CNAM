import express from "express";
import auth from "../utils/authMiddleware";
import { postRefController } from "../controllers/ref";

const router = express.Router();

router.post("/", auth, postRefController);

export default router;
