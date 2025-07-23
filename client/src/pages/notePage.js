import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { summarizeNote } from '../hooks/requests'; 
import UserInfoPanel from '../components/UserInfoPanel';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import './styles/notePage.css';
import axios from 'axios';

function NotePage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { notes, setNotes, username, setUsername, error, setError } = useNotes(token);
  const [noteTitle, setNoteTitle] = useState('');
  const [text, setText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    navigate('/');
  };

  const handleAddNote = async () => {
    if (!noteTitle || !text) {
      setError('Введите и заголовок, и текст');
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/note`, {
        note: { title: noteTitle, content: text }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => [...prev, res.data.note]);
      setNoteTitle('');
      setText('');
      setError(null);
    } catch {
      setError('Не удалось добавить заметку');
    }
  };
  const handleSummarize = async (noteText, noteId) => {
    try {
      const summary = await summarizeNote(noteText);

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === noteId ? { ...note, summary } : note
        )
      );
    } catch (err) {
      console.error(err);
      alert('Ошибка генерации резюме');
    }
  };


  const handleEditNote = (note) => {
    setEditingNoteId(note._id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const handleSaveNote = async () => {
    console.log('Saving note ID:', editingNoteId); 
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/note/${editingNoteId}`, {
        note: {
          title: editingTitle,
          content: editingContent,
        }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => prev.map(n => n._id === editingNoteId ? res.data.note : n));
      setEditingNoteId(null);
      setEditingTitle('');
      setEditingContent('');
      setError(null);
    } catch {
      setError('Не удалось сохранить заметку');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/note/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => prev.filter(n => n._id !== noteId));
    } catch {
      setError('Не удалось удалить заметку');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <UserInfoPanel username={username} onLogout={handleLogout} />
      </aside>

      <main className="main-content">
        <div className="intro-card">
          <h1>{username ? `Привет, ${username}! Вот твои заметки.` : 'Войдите, чтобы посмотреть свои заметки'}</h1>
          {error && <p className="error">{error}</p>}
        </div>

        {username && (
          <>
            <NoteForm
              title={noteTitle}
              content={text}
              onTitleChange={(e) => setNoteTitle(e.target.value)}
              onContentChange={(e) => setText(e.target.value)}
              onSubmit={handleAddNote}
            />
            <NoteList
              notes={notes}
              editingNoteId={editingNoteId}
              editingTitle={editingTitle}
              editingContent={editingContent}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onSave={handleSaveNote}
              onCancel={() => setEditingNoteId(null)}
              onTitleChange={(e) => setEditingTitle(e.target.value)}
              onContentChange={(e) => setEditingContent(e.target.value)}
              onSummarize={handleSummarize}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default NotePage;
