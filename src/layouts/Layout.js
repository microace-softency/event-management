import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, CssVarsProvider } from '@mui/joy';
import { CssBaseline } from '@mui/material';
import Header from '../components/Header';

function Layout({ children }) {
  return (
    <CssVarsProvider disableTransitionOnChange>
    <CssBaseline
     />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* <Sidebar /> */}
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(var(--Header-height))' },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100vh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default Layout;
