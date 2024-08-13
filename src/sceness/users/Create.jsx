import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme'
import { Box, Button, TextField, Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ApisAxios } from '../../api/ApiAxios'
import { useLocation } from 'react-router-dom'

const Create = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const location = useLocation()
    const [isEditId, setisEditId] = useState(false)
    const [valuesInitial, setValuesInitial] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: ''
    })
    const data = location.state?.data || {}
    const isEdit = location.state?.isEdit || false

    useEffect(() => {
        if (isEdit) {
            setValuesInitial({
                name: data.name || '',
                last_name: data.last_name || '',
                email: data.email || '',
                password: '',
                confirmPassword: '',
                age: data.age || ''
            });
            setisEditId(true)
        }
    }, [isEdit, data]);


    const postUser = async (nameData, last_nameData, emailData, ageData, passwordData, resetForm) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ApisAxios.post(
                '/users/',
                {
                    name: nameData,
                    last_name: last_nameData,
                    email: emailData,
                    age: ageData,
                    password: passwordData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.message === 'Usuario creado exitosamente') {
                toast.success(response.data.message);
                resetForm();
            } else {
                toast.error(response.data.error || 'Error desconocido');
            }
        } catch (error) {
            if (error.response) {
                toast.warn(error.response.data.error || 'Error no encontrado');
            } else if (error.request) {
                toast.error('No se ha recibido la solicitud');
            } else {
                toast.error('Hubo un error al crear el usuario');
            }
        }
    };

    const updateUser = async (nameData, last_nameData, emailData, ageData, passwordData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.warning('No estás autorizado');
                return;
            }

            const response = await ApisAxios.put(
                `/users/${data.id}`,
                { 
                    name: nameData,
                    last_name: last_nameData,
                    email: emailData,
                    age: ageData,
                    password: passwordData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            const responseData = response.data;
    
            setValuesInitial({
                name: data.name || '',
                last_name: data.last_name || '',
                email: data.email || '',
                password: '', // No almacenes la contraseña en texto plano
                confirmPassword: '',
                age: data.age || ''
            });
            
    
            if (responseData.message === 'Usuario actualizado exitosamente') {
                toast.success(responseData.message);
            }
        } catch (error) {
            if (error.response) {
                toast.warn(error.response.data.error || 'Error no encontrado');
            } else if (error.request) {
                toast.error('No se ha recibido la solicitud');
            } else {
                toast.error('Hubo un error al actualizar el usuario');
            }
        }
    };
    
    const submit = (data, { resetForm }) => {
        if (isEditId) {
            updateUser(data.name, data.last_name, data.email, data.age, data.password);
        } else {
            postUser(data.name, data.last_name, data.email, data.age, data.password, resetForm);
        }
    };
    

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "El nombre tiene que tener mínimo 3 caracteres").required('El nombre es requerido'),
        last_name: Yup.string().min(3, "El apellido tiene que tener mínimo 3 caracteres").required('El apellido es requerido'),
        email: Yup.string().email('El correo es inválido').required('El correo es requerido'),
        age: Yup.number().positive('El número tiene que ser positivo').max(90, "La edad no puede superar los 90 años").required('La edad es requerida'),
        password: Yup.string().required("La contraseña es requerida"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden").required('Confirmación de contraseña requerida'),
    });

    return (
        <Box m={2}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                width: '800px',
                margin: '0 auto',
            }}>
                <Formik
                    enableReinitialize
                    initialValues={valuesInitial}
                    onSubmit={submit}
                    validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <Box
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{ width: '100%' }}
                        >
                            <Typography
                                variant='h3'
                                color={colors.greenAccent[500]}
                                textAlign='center'
                                m={3}
                            >
                                {isEditId ? 'Actualizar Usuario' : 'Crear Usuario'}
                            </Typography>
                            <Grid container spacing={2}>
                                {/* Rest of the fields */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Nombres"
                                        variant="filled"
                                        fullWidth
                                        margin="normal"
                                        value={values.name || ''}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="last_name"
                                        name="last_name"
                                        label="Apellidos"
                                        variant="filled"
                                        fullWidth
                                        margin="normal"
                                        value={values.last_name || ''}
                                        onChange={handleChange}
                                        error={!!errors.last_name}
                                        helperText={errors.last_name}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="age"
                                        name="age"
                                        label="Edad"
                                        type='number'
                                        variant='filled'
                                        fullWidth
                                        margin="normal"
                                        value={values.age || ''}
                                        onChange={handleChange}
                                        error={!!errors.age}
                                        helperText={errors.age}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Correo"
                                        variant="filled"
                                        fullWidth
                                        margin="normal"
                                        value={values.email || ''}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Contraseña"
                                        variant="filled"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={values.password || ''}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="Confirmar Contraseña"
                                        variant="filled"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={values.confirmPassword || ''}
                                        onChange={handleChange}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                        InputLabelProps={{
                                            style: { color: colors.grey[100] }
                                        }}
                                        InputProps={{
                                            style: { color: colors.grey[100] },
                                            sx: { borderColor: colors.grey[100] }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="filled"
                                        color="success"
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
                                        {isEditId ? 'Actualizar Usuario' : 'Crear Usuario'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>
            </Box>
            <ToastContainer theme={theme.palette.mode === 'dark' ? 'dark' : 'light'} />
        </Box>
    )
}

export default Create
