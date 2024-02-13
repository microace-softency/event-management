import * as React from 'react';
import Box from '@mui/joy/Box';
import { Link } from '@mui/material';
import { Button, Typography, useColorScheme } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useNavigate } from 'react-router-dom';
import { RiMenuFill } from "react-icons/ri";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/icons/logo.png';
import stpPPIlogo from '../assets/icons/stpPPIlogo.png';
import { checkForTicket } from '../context/memberUtils';
import { useAuth } from '../context/AuthContext';


function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        zIndex: 999,
        boxShadow: 'sm',
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function AppNav() {
  const [showDropDown, setShowDropDown] = React.useState(false)
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const navigateToPasses = async() => {
    console.log('hehe', user);
    if (user?.phoneNumber) {
      try {
        console.log('yess');
        const hasTicket = await checkForTicket(user?.phoneNumber);
        if (hasTicket) {
          console.log('User has ticket:', hasTicket);
          navigate(`/passes/${hasTicket}`)
        }else {
          console.log('no tickets found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('not logged in');
      navigate('/login')
    }
  }
  return (
    <div className='w-full shadow'>
      <div className='flex justify-between p-2 items-center flex-row'>
        <div className='flex items-center'>
          <div className='me-4 md:hidden' onClick={() => setShowDropDown(!showDropDown)}>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img className='w-20 -my-8' src={stpPPIlogo} />
            {/* <Typography variant="h6">Event Manage</Typography> */}
          </Box>
        </div>
        <div className='flex items-center mx-2'>
          {user?.phoneNumber && <Button sx={{ mx: 2 }} color="inherit" underline="none" onClick={navigateToPasses}>
            Entry Passes
          </Button>}
          {user?.phoneNumber ? <Button sx={{ mx: 2 }} color="inherit" underline="none" onClick={logout}>
            <LogoutIcon/>
          </Button>
          :
          <Button sx={{ mx: 2 }} color="inherit" underline="none" onClick={()=>navigate('/login')}>
            <LoginIcon/>
          </Button>}
        </div>
      </div>
      {showDropDown &&
        <div className='md:hidden'>
          <div className='w-36'>
            <div className='flex flex-col p-4'>
              {/* <div className='py-2 shadow'>
              <Link sx={{ mx: 2 }} color="inherit" underline="none" onClick={() => navigate('/')}>
                Home
              </Link>
            </div>
            <div className='py-2 shadow'>
              <Link sx={{ mx: 2 }} color="inherit" underline="none" onClick={() => navigate('/event')} >
               Event
              </Link>
            </div>
            <div className='py-2 shadow'>
              <Link sx={{ mx: 2 }} color="inherit" underline="none" href="/passes">
                Entry Passes
              </Link>
            </div> */}
              {/* <Button
              onClick={() => navigate('/login')}
              variant="outlined"
              color="primary"
              href="#"
            >
              Login
            </Button> */}
            </div>
          </div>
        </div>}
    </div>
  );
}
