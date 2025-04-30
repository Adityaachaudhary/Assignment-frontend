# React Notes App

A simple note-taking application built with React that lets users add and view notes with client-side persistence using localStorage.

## Setup & Run

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Design Decisions

### Storage Strategy
- **Why localStorage + key naming**: 
  - localStorage provides a simple, built-in way to persist data across sessions without a backend
  - Used a consistent key naming convention ('react-notes-app') to avoid conflicts with other apps
  - Structured data as an array of note objects for easy retrieval and rendering

### Component Design
- **Why these components**:
  - Separated concerns with dedicated components for adding notes, viewing notes, and navigation
  - Used a clean, minimalist UI to focus on functionality
  - Component interfaces are simple and focused on their primary responsibility

### State Management
- **Why useState + lifting state**:
  - Used React's built-in useState for form controls and simple state needs
  - Lifted navigation state to the App component to coordinate view rendering
  - Preferred local component state over global state management for this simple app

### Styling
- **Why Tailwind CSS**:
  - Utility-first approach enables rapid development without context switching
  - Consistent design tokens create visual harmony across the app
  - Zero build complexity with direct class application in JSX

### Navigation
- **Why tab-based navigation**:
  - Simple tab interface provides clear context for the user
  - Avoids complexity of routing for a single-page application
  - Tab state is directly tied to component rendering for predictable UI
