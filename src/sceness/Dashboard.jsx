import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    } else {
      console.log(token);
      // Aquí podrías realizar más lógica relacionada con el token si es necesario
    }
  }, [navigate]);

  return (
    <div>
      Este es el Dashboard
      <ToastContainer theme='dark' />
    </div>
  );
};

export default Dashboard;
