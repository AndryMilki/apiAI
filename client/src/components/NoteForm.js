import React from 'react';

const NoteForm = ({ title, content, onTitleChange, onContentChange, onSubmit }) => (
  <div className="note-form">
    <input type="text" placeholder="Заголовок" value={title} onChange={onTitleChange} />
    <textarea placeholder="Текст заметки" value={content} onChange={onContentChange} />
    <button onClick={onSubmit}>Добавить заметку</button>
  </div>
);

export default NoteForm;
