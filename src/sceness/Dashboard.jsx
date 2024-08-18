import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (location.state?.formLogin) {
      toast.success(location.state.message);
      navigate('/dashboard', { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: 'center',
        boxShadow: `0 4px 20px ${colors.grey[900]}`,
        borderRadius: 3,
        p: 4,
        flexDirection: 'column'
      }}
    >
      <Typography 
        variant='h1' 
        color='#4cceac' 
        sx={{
          fontWeight: 700, 
          letterSpacing: '0.05em', 
          textShadow: `2px 2px #e0e0e0`,
          mb: 3
        }}
      >
        Bienvenidos a la aplicación
      </Typography>
      <ToastContainer theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}/>
    </Box>
  );
};

export default Dashboard;
