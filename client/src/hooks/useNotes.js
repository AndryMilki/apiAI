import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNotes = (token) => {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios.get(`${process.env.REACT_APP_API_URL}/auth/current`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUsername(res.data.username);
      return axios.get(`${process.env.REACT_APP_API_URL}/note/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }).then(res => setNotes(res.data.notes))
      .catch(() => setError('Помилка авторизації або отримання нотаток'));
  }, [token]);

  return { notes, setNotes, username, setUsername, error, setError };
};
