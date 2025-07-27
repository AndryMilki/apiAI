const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log('POST body:', req.body);
        const { title, content, tag } = req.body.note;

        if (!content || !title || !tag) {
            return res.status(400).json({ message: 'Вміст, заголовок і тег нотатки не можуть бути порожніми' });
        }
        
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        user.notes.push({ title, content, tag });
        await user.save();

        const addedNote = user.notes[user.notes.length - 1]; 
        res.status(201).json({ message: 'Нотатку успішно додано', note: addedNote });
    } catch (err) {
        console.error('Помилка додавання нотатки:', err);
        res.status(500).json({ message: 'Помилка додавання нотатки' });
    }
});

router.get('/notes', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }
        res.json({ notes: user.notes });
    } catch (err) {
        console.error('Помилка при отриманні нотаток:', err);
        res.status(500).json({ message: 'Помилка при отриманні нотаток' });
    }
});

router.put('/:noteId', async (req, res) => {
    console.log('PUT body:', req.body);
    console.log('Note ID:', req.params.noteId);
    const { noteId } = req.params; 
    const { note } = req.body;
    const { title, content, tag } = note || {};

    if (!title || !content || !tag) {
        return res.status(400).json({ message: 'Заголовок, вміст і тег не можуть бути порожніми' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        const noteItem = user.notes.id(noteId);
        if (!noteItem) {
            return res.status(404).json({ message: 'Нотатку не знайдено' });
        }

        noteItem.title = title;
        noteItem.content = content;
        noteItem.tag = tag;
        await user.save();

        res.json({ message: 'Нотатку оновлено', note: noteItem });
    } catch (err) {
        console.error('Помилка при оновленні нотатки:', err);
        res.status(500).json({ message: 'Помилка при оновленні нотатки' });
    }
});

router.delete('/:noteId', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

        const noteId = req.params.noteId;

        if (!Array.isArray(user.note)) {
            user.note = [];
        }

        user.notes = user.notes.filter(note => note._id.toString() !== noteId);

        await user.save();
        res.status(200).json({ message: 'Нотатку видалено' });
    } catch (err) {
        console.error('Помилка видалення нотатки:', err);
        res.status(500).json({ message: 'Помилка видалення нотатки' });
    }
});

module.exports = router;
