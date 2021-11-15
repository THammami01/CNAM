import express from "express";
import auth from "../utils/authMiddleware";
import {
  checkConsultationDataController,
  saveEntryDataController,
} from "../controllers/entry";

const router = express.Router();

router.post("/check-consultation-data", auth, checkConsultationDataController);
router.post("/save-entry-data", auth, saveEntryDataController);

export default router;
