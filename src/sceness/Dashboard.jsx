import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.formLogin) {
      toast.success(location.state.message)
      navigate('/dashboard', { replace: true })
    }
  }, [location.state, navigate])

  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: "center" , height: "70vh"}}>
      Este es el Dashboard
      <ToastContainer theme='dark' />
    </div>
  );
};

export default Dashboard;
