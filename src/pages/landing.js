import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';

import framesxTheme from '../theme';
import HeroLeft01 from '../components/HeroLeft01';
import AppNav from '../components/AppNav';
import HeroLeft02 from '../components/HeroLeft02';


export default function TeamExample() {
  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
          },
        }}
      >
        <AppNav/>
        <HeroLeft01 />
        <HeroLeft02 />
        {/* <Album/> */}
      </Box>
    </CssVarsProvider>
  );
}
