const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const noteContent = req.body.note.content;
        const noteTitle = req.body.note.title;

        if (!noteContent || !noteTitle) {
            return res.status(400).json({ message: 'Содержимое и заголовок заметки не могут быть пустыми' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        user.notes.push({ title: noteTitle, content: noteContent });
        await user.save();

        res.status(201).json({ message: 'Заметка успешно добавлена', note: { title: noteTitle, content: noteContent } });
    } catch (err) {
        console.error('Ошибка добавления заметки:', err);
        res.status(500).json({ message: 'Ошибка добавления заметки' });
    }
});

router.get('/notes', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json({ notes: user.notes });
    } catch (err) {
        console.error('Ошибка при получении заметок:', err);
        res.status(500).json({ message: 'Ошибка при получении заметок' });
    }
});

router.put('/:noteId', async (req, res) => {
    console.log('PUT body:', req.body);
    console.log('Note ID:', req.params.noteId);
    const { noteId } = req.params; 
    const { note } = req.body;
    const { title, content } = note || {};

    if (!title || !content) {
        return res.status(400).json({ message: 'Заголовок и содержимое не могут быть пустыми' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const noteItem = user.notes.id(noteId);
        if (!noteItem) {
            return res.status(404).json({ message: 'Заметка не найдена' });
        }

        noteItem.title = title;
        noteItem.content = content;
        await user.save();

        res.json({ message: 'Заметка обновлена', note: noteItem });
    } catch (err) {
        console.error('Ошибка при обновлении заметки:', err);
        res.status(500).json({ message: 'Ошибка при обновлении заметки' });
    }
});


router.delete('/:noteId', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        const noteId = req.params.noteId;

        if (!Array.isArray(user.note)) {
            user.note = [];
        }

        user.notes = user.notes.filter(note => note._id.toString() !== noteId);

        await user.save();
        res.status(200).json({ message: 'Заметка удалена' });
    } catch (err) {
        console.error('Ошибка удаления заметки:', err);
        res.status(500).json({ message: 'Ошибка удаления заметки' });
    }
});

module.exports = router;