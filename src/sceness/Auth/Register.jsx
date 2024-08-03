import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { tokens } from '../../theme';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { ApisAxios } from '../../api/ApiAxios';
import { toast } from 'react-toastify';

const Register = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate()
    const [valuesInitial, setvaluesInitial] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
    })


    const validationsSchema = Yup.object().shape({
        name: Yup.string().min(3, "El nombre tiene que tener minimo 3 caracteres").required('El nombre es requerido'),
        last_name: Yup.string().min(3, "El apellido tiene que tener minimo 3 caracteres").required('El apellido es requerido'),
        email: Yup.string().email('El correo es invalido').required('El correo es requerido'),
        age: Yup.number().positive('El numero tiene que ser positivo').max(90, "La edad no puede superar a los 90").required('La edad es requerida'),
        password: Yup.string().required("La contraseña es requerida"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden").required('Confirmación de contraseña requerida'),
    })
    const submit = async (data) => {
        try {
            const response = await ApisAxios.post("auth/register", {
                name: data.name,
                last_name: data.last_name,
                age: data.age,
                password: data.password,
                email: data.email
            });

            if (response.data.message === 'Usuario creado correctamente') {
                console.log(data)
                setvaluesInitial({
                    ...valuesInitial,
                    name: "",
                    last_name: "",
                    age: "",
                    email: "",
                    confirmPassword: "",
                    password: ""
                })
                navigate('/', { state: { formRegister: true, message: response.data.message } })
            }
            else{
                toast.error(response.data.error || 'Error desconocido')
            }
        } catch (error) {
            if (error.response) {
                console.log('Error response: ', error.response.data)
                toast.warn(error.response.data.error || 'Error no encontrado')
            }else if (error.request) {
                console.log('Error de la request: ', error.response.data)
                toast.error('No se ha recibido la solicitud')
            }
            else{
                console.log(error);
                toast.error('Hubo un error al crear el usuario')
            }

        }
    };

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
                    Registrar usuario
                </Typography>
                <Formik initialValues={valuesInitial} onSubmit={submit} validationSchema={validationsSchema}>
                    {({ values, handleSubmit, handleChange, errors }) => (
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
                                id="name"
                                name="name"
                                label="Nombres"
                                variant="outlined"
                                value={values.name}
                                helperText={errors.name}
                                onChange={handleChange}
                                error={!!errors.name}
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
                                id="last_name"
                                name="last_name"
                                label="Apellidos"
                                variant="outlined"
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                value={values.last_name}
                                onChange={handleChange}
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
                                id="age"
                                name="age"
                                label="Edad"
                                type='number'
                                error={!!errors.age}
                                value={values.age}
                                helperText={errors.age}
                                onChange={handleChange}
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
                                id="email"
                                name="email"
                                label="Correo"
                                variant="outlined"
                                error={!!errors.email}
                                value={values.email}
                                helperText={errors.email}
                                onChange={handleChange}
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
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                error={!!errors.password}
                                value={values.password}
                                helperText={errors.password}
                                onChange={handleChange}
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
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                variant="outlined"
                                type="password"
                                value={values.confirmPassword}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                onChange={handleChange}
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
                            <Link to='/' style={{ listStyle: 'none', color: colors.greenAccent[400], margin: "10px" }}>Regresar Login</Link>
                        </Box>
                    )}

                </Formik>
            </Box>
        </Container>
    )
}

export default Register
