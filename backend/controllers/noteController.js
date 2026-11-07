
export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = await Note.create({
            title,
            content,
        })
        res.status(201), json(newNote)
    } catch (error) {
        res.status(400).json({ message: "Ошибка при создании заметки: ", error})
    }
}