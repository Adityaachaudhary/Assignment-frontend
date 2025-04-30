import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NotesIcon from '@mui/icons-material/Notes';
import Paper from '@mui/material/Paper';

function Navigation({ activeTab, setActiveTab }) {
  // Why this nav approach for simplicity:
  // Using a simple tab-based navigation with Material UI Tabs
  // makes for a clean, intuitive UI without adding router complexity
  
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Note app navigation"
          sx={{ 
            '.MuiTabs-indicator': { 
              height: 3,
            },
          }}
        >
          <Tab 
            icon={<NoteAddIcon />} 
            iconPosition="start"
            label="Add Note" 
            value="add"
            sx={{ 
              py: 2,
              fontWeight: activeTab === 'add' ? 600 : 400,
            }}
          />
          <Tab 
            icon={<NotesIcon />} 
            iconPosition="start"
            label="View Notes" 
            value="view" 
            sx={{ 
              py: 2,
              fontWeight: activeTab === 'view' ? 600 : 400,
            }}
          />
        </Tabs>
      </Box>
    </Paper>
  );
}

export default Navigation; 