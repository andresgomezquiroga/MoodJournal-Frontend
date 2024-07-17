import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { ApisAxios } from '../../api/ApiAxios';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const Login = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorModeContext = useContext(ColorModeContext);
    const location = useLocation()
    const navigate = useNavigate()


    const [valuesInitial, setvaluesInitial] = useState({
        email: "",
        password: ""
    })


    const postLogin = async (email, password) => {
        try {
            const response = await ApisAxios.post('/login', { email: email, password: password })
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                setvaluesInitial({
                    email: "",
                    password: ""
                })
                navigate('/dashboard', { state: { formLogin: true, message: response.data.message } })
            }
            else {
                toast.warning(response.data.error || 'Error desconocida')
            }

        } catch (error) {
            if (error.response) {
                console.log('Error response', error.response.data)
                toast.warning(error.response.data.error || 'Error desconocida')
            } else if (error.request) {
                console.log('Error request', error.response.data)
                toast.error('No se ha recibido la solicitud')
            } else {
                console.log('Error mensaje', error.message)
                toast.error('Hubo un error al iniciar sesión')
            }
        }
    }

    const validationsSchema = Yup.object().shape({
        email: Yup.string().email('Correo invalido').required('El correo es requerido'),
        password: Yup.string().required('La contraseña es requerida')
    })

    useEffect(() => {
        if (location.state?.formRegister) {
            toast.success(`${location.state.message}.Por favor, inicie sesión.`);
            // el replace es para limpiar el estado antes que el usuario refresque
            navigate('/', { replace: true })
        }
    }, [location.state, navigate])


    const submit = (data) => {
        postLogin(data.email, data.password)
    }

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: 'column',
                color: colors.greenAccent[100]
            }}
        >
            <IconButton onClick={colorModeContext.toggleColorMode}>
                {
                    theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )
                }
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '400px'
                }}
            >

                <Typography
                    variant='h4'
                    color={colors.greenAccent[500]}
                    sx={{
                        mb: 2,
                        borderBottom: `2px solid ${colors.greenAccent[400]}`
                    }}
                >
                    Inicio de sesión
                </Typography>
                <Formik initialValues={valuesInitial} onSubmit={submit} validationSchema={validationsSchema}>
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '400px',
                            }}
                        >
                            <TextField
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                label="Correo"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    style: { color: colors.grey[100] }
                                }}
                                InputProps={{
                                    style: { color: colors.grey[100] },
                                    sx: { borderColor: colors.grey[100] }
                                }}
                            />

                            <TextField
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    style: { color: colors.grey[100] }
                                }}
                                InputProps={{
                                    style: { color: colors.grey[100] },
                                    sx: { borderColor: colors.grey[100] }
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    bgcolor: colors.greenAccent[500],
                                    '&:hover': {
                                        bgcolor: colors.greenAccent[400],
                                    },
                                    color: colors.grey[900]
                                }}
                            >
                                Ingresar
                            </Button>
                            <Link to='/register' style={{ listStyle: 'none', color: colors.greenAccent[400], margin: "10px" }}>Registrarse usuario</Link>
                        </Box>
                    )}
                </Formik>
                <ToastContainer theme='dark' />
            </Box>

        </Container>
    );
}

export default Login;
