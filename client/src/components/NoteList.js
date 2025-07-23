import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({
  notes, editingNoteId, editingTitle, editingContent,
  onEdit, onDelete, onSave, onCancel,
  onTitleChange, onContentChange, onSummarize
}) => (
  <div className="notes-list">
    {notes.map(note => (
      <NoteCard
        key={note._id}
        note={note}
        isEditing={editingNoteId === note._id}
        editingTitle={editingTitle}
        editingContent={editingContent}
        onEdit={onEdit}
        onDelete={onDelete}
        onSave={onSave}
        onCancel={onCancel}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        onSummarize={onSummarize}
      />
    ))}
  </div>
);

export default NoteList;

