import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Home from './pages/Home';
import AddTaxPayer from './pages/AddTaxPayer';
import EditTaxPayer from './pages/EditTaxPayer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f5f5f5',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTaxPayer />} />
            <Route path="/edit/:tid" element={<EditTaxPayer />} />
          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
