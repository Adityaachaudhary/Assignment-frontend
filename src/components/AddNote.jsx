import { useState } from 'react';
import { saveNote } from '../utils/storage';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Why I chose useState + this submit handler: 
  // useState for controlling form inputs provides a clean way to capture and validate user input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      setSuccess(false);
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);
      // Why show spinner here: Visual feedback during async operation improves UX
      await saveNote({ title, content, timestamp: Date.now() });
      
      setTitle('');
      setContent('');
      setSuccess(true);
    } catch (err) {
      // Why display error banner: Transparent error handling helps users understand issues
      setError('Failed to save note: ' + err.message);
      setSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Note
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" onClose={() => setSuccess(false)}>
              Note saved successfully!
            </Alert>
          )}
          
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={error && !title.trim()}
            helperText={error && !title.trim() ? "Title is required" : ""}
          />
          
          <TextField
            id="content"
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            error={error && !content.trim()}
            helperText={error && !content.trim() ? "Content is required" : ""}
          />
          
          <Button 
            type="submit"
            variant="contained"
            size="large"
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ py: 1.5 }}
          >
            {isSaving ? 'Saving...' : 'Save Note'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AddNote; 