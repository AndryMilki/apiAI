import axios from 'axios';

export async function summarizeNote(text) {
    const response = await axios.post('/api/summarize', {
        noteText: text,
    });
    return response.data.summary;
}
