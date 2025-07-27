import React, { useState, useEffect } from 'react';
import NoteCard from './NoteCard';

const NoteList = ({
  notes, editingNoteId, editingTitle, editingContent, editingTag,
  onEdit, onDelete, onSave, onCancel,
  onTitleChange, onContentChange, onTagChange, onSummarize
}) => {
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [sortedNotes, setSortedNotes] = useState([]);

  useEffect(() => {
    const sorted = [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSortedNotes(sorted);
  }, [notes, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="notes-list">
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleSortToggle}>
          Сортувати по даті: {sortOrder === 'asc' ? 'Спочатку старі ↑' : 'Спочатку нові ↓'}
        </button>
      </div>

      {sortedNotes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          isEditing={editingNoteId === note._id}
          editingTitle={editingTitle}
          editingContent={editingContent}
          editingTag={editingTag}
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
          onTitleChange={onTitleChange}
          onContentChange={onContentChange}
          onTagChange={onTagChange}
          onSummarize={onSummarize}
        />
      ))}
    </div>
  );
};

export default NoteList;
