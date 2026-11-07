import express from "express";
import { createNote, getNote, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNote);
router.get('/:id', getNoteById);
router.patch('/:id', updateNote )
router.delete('/:id', deleteNote)

export default router;
