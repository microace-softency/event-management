import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, CssVarsProvider } from '@mui/joy';
import { CssBaseline } from '@mui/material';
import AppNav from '../components/AppNav';

function PublicLayout({ children }) {
  return (
    <CssVarsProvider disableTransitionOnChange>
    <CssBaseline
     />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppNav />
          {children}
      </Box>
    </CssVarsProvider>
  );
}

export default PublicLayout;
