import Note from "../models/Note.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({
      title,
      content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Ошибка создания заметки: ", error);
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Ошибка при получении списка задач: ", error);
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      res.status(404);
      return next(new Error("Заметка не найдена"));
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Ошибка поиска заметки: ", error);
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedNote) {
       res.status(404)
       return next(new Error("Заметка не найдена"));
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Ошибка обновления заметки: ", error);
    next(error)
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
       res.status(404)
       return next(new Error("Заметка не найдена" ));
    }
    res.status(200).json({ message: "Заметка успешно удалена" });
  } catch (error) {
    console.error("Ошибка удаления: ", error);
    next(error)
  }
};
