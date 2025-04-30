import { useState, useEffect } from 'react';
import { getNotes } from '../utils/storage';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Styles
  const styles = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '1rem'
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1f2937'
    },
    loadingContainer: {
      width: '100%',
      textAlign: 'center',
      padding: '2rem 0'
    },
    spinner: {
      display: 'inline-block',
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      borderTop: '2px solid #3b82f6',
      borderRight: '2px solid transparent',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    },
    loadingText: {
      marginTop: '0.5rem',
      color: '#6b7280'
    },
    errorContainer: {
      marginBottom: '1rem',
      padding: '0.5rem',
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      color: '#b91c1c',
      borderRadius: '0.25rem'
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem 0',
      color: '#6b7280'
    },
    notesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    noteCard: {
      padding: '1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      transition: 'box-shadow 0.3s, transform 0.3s',
      backgroundColor: 'white'
    },
    noteCardHover: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    },
    noteTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#1f2937'
    },
    noteContent: {
      color: '#4b5563',
      marginBottom: '0.5rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    noteDate: {
      fontSize: '0.75rem',
      color: '#9ca3af'
    },
    '@keyframes spin': {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    }
  };

  // Why useEffect to sync storage → state:
  // useEffect ensures notes are loaded from storage when component mounts
  // and provides clean separation between UI rendering and data fetching
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const storedNotes = await getNotes();
        setNotes(storedNotes);
        setError(null);
      } catch (err) {
        setError('Failed to load notes: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);
  
  // Add hover state for note cards
  const [hoveredNoteId, setHoveredNoteId] = useState(null);

  if (loading) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading notes...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Paper>
    );
  }

  if (notes.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 250
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No notes yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create your first note using the "Add Note" tab!
        </Typography>
      </Paper>
    );
  }

  // Function to format date in relative time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
    }
    if (diffHour > 0) {
      return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
    }
    if (diffMin > 0) {
      return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    }
    return 'Just now';
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Your Notes ({notes.length})
      </Typography>
      
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} key={note.timestamp}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  py: 1,
                  px: 2
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3" 
                  noWrap 
                  title={note.title}
                  sx={{ fontWeight: 500 }}
                >
                  {note.title}
                </Typography>
              </Box>
              <CardContent sx={{ py: 2, flexGrow: 1 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1,
                    height: '5em',
                  }}
                >
                  {note.content}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ px: 2, py: 1, justifyContent: 'flex-end' }}>
                <Chip 
                  icon={<AccessTimeIcon fontSize="small" />}
                  label={formatDate(note.timestamp)}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default NotesList; 