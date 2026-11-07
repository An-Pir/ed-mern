import express from "express";
import { createNote, getNote, getNoteById } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNote);
router.get('/:id', getNoteById)

export default router;
