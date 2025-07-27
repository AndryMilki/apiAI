import React from 'react';

const NoteCard = ({
  note, isEditing, editingTitle, editingContent, editingTag,
  onEdit, onDelete, onSave, onCancel,
  onTitleChange, onContentChange, onTagChange, onSummarize
}) => (
  <div className="note-card">
    {isEditing ? (
      <>
        <input type="text" value={editingTitle} onChange={onTitleChange} />
        <textarea value={editingContent} onChange={onContentChange} />
        <input type="text" value={editingTag} onChange={onTagChange} />
        <button onClick={onSave}>Зберегти</button>
        <button onClick={onCancel}>Скасувати</button>
      </>
    ) : (
      <>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        {note.summary && <p><strong>Резюме:</strong> {note.summary}</p>}
        <p><strong>Тег:</strong> {note.tag}</p>
        <p><strong>Создано:</strong> {new Date(note.createdAt).toLocaleString()}</p>
        <button onClick={() => onEdit(note)}>Редагувати</button>
        <button onClick={() => onDelete(note._id)}>Видалити</button>
        <button onClick={() => onSummarize(note.content, note._id)}>Зробити резюме</button>
      </>
    )}
  </div>
);

export default NoteCard;
