import express from "express";
import { addAiPrompt, deleteAiPrompt, getAllAiProjects, getTopSixAiProjects } from "../controllers/aiProjectController.js";
import { uploadProjectFiles } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/add-ai-project", uploadProjectFiles , addAiPrompt);
router.delete("/delete-ai-project/:_id" , deleteAiPrompt);
router.get("/get-ai-project" , getAllAiProjects);
router.get("/get-top-six" , getTopSixAiProjects);

export default router;