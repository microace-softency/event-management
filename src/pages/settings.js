import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import framesxTheme from '../theme';
import { useAuth } from '../context/AuthContext';
import Input from '@mui/joy/Input';
import { FormLabel } from '@mui/joy';

const Settings = () => {
  const { user, updateProfileInfo } = useAuth();
  const [displayName, setDisplayName] = React.useState(user?.displayName || '');
  const [mobileNumber, setMobileNumber] = React.useState(user?.mobileNumber || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [isEditing, setIsEditing] = React.useState(false);

  const handleUpdateProfile = async () => {
    const profileInfo = {
        displayName: displayName,
        mobileNumber: mobileNumber
    }
    try {
      await updateProfileInfo(profileInfo).then((res)=>{
        console.log(res);
      })
    
    console.log('profileInfo', profileInfo);
      setIsEditing(false);
      // You can add a success message or navigate to another page after updating
    } catch (error) {
      console.error('Error updating profile:', error.message);
      // Handle the error, show a message, or log it as needed
    }
  };

  return (
    <ThemeProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {isEditing ? 'Update Profile Information' : 'Profile Information'}
        </Typography>
        {!isEditing ? (
          <div>
            <div className='py-2'>
                <FormLabel className='pb-2'>Display Name :</FormLabel>
                <Input type="text" disabled value={displayName}/>
            </div>
            <div className='py-2'>
                <FormLabel className='pb-2'>Email :</FormLabel>
                <Input type="text" disabled value={email}/>
            </div>
            <div className='py-2 mb-3'>
                <FormLabel className='pb-2'>Mobile Number :</FormLabel>
                <Input type="text" disabled value={mobileNumber}/>
            </div>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <form>
            <div className='py-2'>
                <FormLabel className='pb-2'>Display Name :</FormLabel>
                <Input
                    fullWidth
                    id="displayName"
                    placeholder="Display Name"
                    variant="outlined"
                    margin="normal"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            <div className='py-2'>
                <FormLabel className='pb-2'>Email :</FormLabel>
                <Input
                    fullWidth
                    id="email"
                    placeholder="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='py-2 mb-3'>
                <FormLabel className='pb-2'>Mobile Number :</FormLabel>
                <Input
                    fullWidth
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    variant="outlined"
                    margin="normal"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <div className='flex justify-between'>
                <Button
                type="button"
                variant="outlined"
                color="danger"
                onClick={() => setIsEditing(false)}
                >
                Cancel
                </Button>
                <Button
                type="button"
                variant="solid"
                color="success"
                onClick={handleUpdateProfile}
                >
                Update Profile
                </Button>
            </div>
          </form>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
