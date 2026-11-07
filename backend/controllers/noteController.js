import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({
      title,
      content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при создании заметки: ", error: error.message });
    console.error(error);
  }
};

export const getNote = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении списка задач:",
      error: error.message,
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Заметка не найдена" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Ошибка поиска заметки: ", error);
    res
      .status(400)
      .json({ message: "Не корректный ID заметки", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Заметка не найдена" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Ошибка обновления заметки: ", error);
    res
      .status(400)
      .json({
        message: "Ошибка при обновлении заметки: ",
        error: error.message,
      });
  }
};

export const deleteNote = async (req, res) => {
    try {
      const {id} = req.params;
      const deletedNote = await Note.findByIdAndDelete(id);
      if(!deletedNote) {
        return res.status(404).json({message: "Заметка не найдена"})
      }  
      res.status(200).json({message: "Заметка успешно удалена", id: deletedNote._id})
      console.log(deletedNote._id)
    } catch (error) {
        console.error("Ошибка удаления: ", error);
       res.status(400).json({message: "Не корректный ID", error: error.message})
    }
}
