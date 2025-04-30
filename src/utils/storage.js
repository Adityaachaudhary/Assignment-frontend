const STORAGE_KEY = 'react-notes-app';

// Helper to create a small delay to simulate async operations
// and demonstrate loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Save a note to localStorage
 * @param {Object} note - The note object to save
 * @returns {Promise<Object>} - The saved note
 */
export const saveNote = async (note) => {
  try {
    // Simulate a short delay to show saving indicator
    await delay(500);
    
    // Get existing notes
    const notes = await getNotes();
    
    // Add new note to the beginning
    notes.unshift(note);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    
    return note;
  } catch (error) {
    console.error('Error saving note:', error);
    throw new Error('Could not save note. Storage might be full.');
  }
};

/**
 * Get all notes from localStorage
 * @returns {Promise<Array>} - Array of notes
 */
export const getNotes = async () => {
  try {
    // Simulate a short delay to show loading indicator
    await delay(500);
    
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting notes:', error);
    throw new Error('Could not retrieve notes from storage.');
  }
};

/**
 * Clear all notes from localStorage
 * @returns {Promise<void>}
 */
export const clearNotes = async () => {
  try {
    await delay(300);
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing notes:', error);
    throw new Error('Could not clear notes from storage.');
  }
}; 