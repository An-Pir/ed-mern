import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Пожалуйста, укажите заголовок"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Пожалуйста, введите текст заметки"],
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
