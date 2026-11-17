import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Строго указываем, что этот ID берется из модели User
    },
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
