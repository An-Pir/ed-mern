import Note from "../models/Note.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({
      title,
      content,
      user: req.user._id,
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Ошибка создания заметки: ", error);
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
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
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403); // 403 Forbidden - Доступ запрещен
      throw new Error("У вас нет прав на просмотр этой заметки");
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
    const updatedNote = await Note.findOneAndUpdate({_id: id, user: req.user._id}, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedNote) {
      res.status(404);
      return next(new Error("Заметка не найдена или у вас нет прав на ее изменение"));
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Ошибка обновления заметки: ", error);
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({_id: id, user: req.user._id});
    if (!deletedNote) {
      res.status(404);
      return next(new Error("Заметка не найдена или у вас нет прав на ее удаление"));
    }
    res.status(200).json({ message: "Заметка успешно удалена" });
  } catch (error) {
    console.error("Ошибка удаления: ", error);
    next(error);
  }
};
