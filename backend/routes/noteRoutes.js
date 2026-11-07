import express from "express";
import { createNote, getNote, getNoteById, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNote);
router.get('/:id', getNoteById);
router.patch('/:id', updateNote )

export default router;
