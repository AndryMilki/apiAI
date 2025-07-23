import React from 'react';

const NoteCard = ({
  note, isEditing, editingTitle, editingContent,
  onEdit, onDelete, onSave, onCancel,
  onTitleChange, onContentChange, onSummarize
}) => (
  <div className="note-card">
    {isEditing ? (
      <>
        <input type="text" value={editingTitle} onChange={onTitleChange} />
        <textarea value={editingContent} onChange={onContentChange} />
        <button onClick={onSave}>Сохранить</button>
        <button onClick={onCancel}>Отмена</button>
      </>
    ) : (
      <>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>{note.summary}</p>
        <button onClick={() => onEdit(note)}>Редактировать</button>
        <button onClick={() => onDelete(note._id)}>Удалить</button>
        <button onClick={() => onSummarize(note.content, note._id)}>Сделать резюме</button>
      </>
    )}
  </div>
);

export default NoteCard;
