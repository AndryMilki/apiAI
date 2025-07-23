const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username,password,confirmPassword,email} = req.body;
    if (!username || !password || !confirmPassword || !email) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Пароли не совпадают' });
    }
    try{
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        const token = jwt.sign(
            { sub:newUser._id, username:newUser.username },
            process.env.JWT_SECRET
        );

        res.status(201).json({
            message: 'Регистрация прошла успешно',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        });
    }catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return res.status(500).json({ message: 'Ошибка сервера' });
        if (!user) return res.status(401).json({ message: info.message || 'Неверные данные' });

        const token = jwt.sign(
            { sub: user._id, username: user.username },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            message: 'Вход выполнен успешно',
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    })(req, res, next);
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ username: req.user.username });
});

module.exports = router;