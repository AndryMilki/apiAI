require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
require('./config/passport')(passport);
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');
const summarizeRoutes = require('./routes/summarize');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB підключено'))
.catch(err => console.error('MongoDB підключення помилка:', err));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/note', passport.authenticate('jwt', { session: false }), noteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/summarize', summarizeRoutes);
app.get('/', (req, res) => {
  res.send('Сервер працює без проблем');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});