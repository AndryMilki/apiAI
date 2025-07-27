import React from 'react';

const NoteForm = ({ title, content, tag, onTitleChange, onContentChange, onTagChange, onSubmit }) => (
  <div className="note-form">
    <input type="text" placeholder="Заголовок" value={title} onChange={onTitleChange} />
    <textarea placeholder="Текст нотатки" value={content} onChange={onContentChange} />
    <input type="text" placeholder="Тег" value={tag} onChange={onTagChange} />
    <button onClick={onSubmit}>Добавити нотатку</button>
  </div>
);

export default NoteForm;
