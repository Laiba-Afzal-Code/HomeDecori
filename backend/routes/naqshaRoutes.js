import express from "express";
import {generateNaqsha} from "../controllers/naqshaController.js"

const router = express.Router();

router.post("/generate", generateNaqsha);


export default router;