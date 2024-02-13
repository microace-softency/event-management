import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/joy/Box';
import { formLabelClasses } from '@mui/joy/FormLabel';

import PhoneAuth from '../components/PhoneAuth'

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import Typography from '@mui/joy/Typography';

export default function Singin() {
  const {user} = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.phoneNumber) {
      navigate('/')
    }
  }, [user])
  return (
    <Box
      component="main"
      sx={{
        mt: 'auto',
        py: 2,
        pb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
        [`& .${formLabelClasses.asterisk}`]: {
          visibility: 'hidden',
        },
      }}
    >
      <Box sx={{ mb: 2 , padding:"7%"}}>
        <Typography sx={(theme) => ({
          textTransform: 'uppercase',
          fontFamily: 'Josefin Sans'
        })} level="h1">
          <br /> Book <br />your  <br />tickets  <br />now <br />
        </Typography>
      </Box>
      <div style={{padding:"7%"}}>
      <PhoneAuth />
      </div>
    </Box>
  );
}