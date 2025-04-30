import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import Navigation from './components/Navigation';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    subtitle1: {
      marginBottom: 16,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 24,
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          py: 4,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              React Notes App
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              A simple note-taking application
            </Typography>
          </Paper>
          
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <Box sx={{ mt: 3 }}>
            {activeTab === 'add' ? <AddNote /> : <NotesList />}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
