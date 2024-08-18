import { useTheme } from '@emotion/react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme'
import image from '/img/imgDefect.webp'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ApisAxios } from '../../api/ApiAxios'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProfileUser = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [id, setid] = useState(null)
  const [selectedImage, setselectedImage] = useState(null)
  const [valuesInitial, setValuesInitial] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    img: '',
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "El nombre tiene que tener mínimo 3 caracteres").required('El nombre es requerido'),
    last_name: Yup.string().min(3, "El apellido tiene que tener mínimo 3 caracteres").required('El apellido es requerido'),
    email: Yup.string().email('El correo es inválido').required('El correo es requerido'),
    age: Yup.number().positive('El número tiene que ser positivo').max(90, "La edad no puede superar los 90 años").required('La edad es requerida'),
    password: Yup.string().required("La contraseña es requerida"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden").required('Confirmación de contraseña requerida'),
    img: Yup.string(), // Agrega validación para la imagen si es necesario
  })

  useEffect(() => {
    const tokenUser = localStorage.getItem('token')
    if (typeof tokenUser != 'string') {
      toast.error('Token invalido')
    }

    if (tokenUser) {
      const getInfoToken = jwtDecode(tokenUser)
      setid(getInfoToken.id)
    }
  }, [])

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await ApisAxios.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      setValuesInitial({
        name: data.name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        age: data.age || '',
        password: '',
        confirmPassword: '',
        img: data.img || '', // Aquí se asigna el nombre de la imagen
      })

    } catch (error) {
      if (error.response) {
        console.log('Error response: ', error.response.data)
        toast.warn(error.response.data.error || 'Error no encontrado')
      } else if (error.request) {
        console.log('Error de la request: ', error.response.data)
        toast.error('No se ha recibido la solicitud')
      } else {
        console.log(error)
        toast.error('Hubo un error al crear el usuario')
      }
    }
  }

  useEffect(() => {
    if (id) {
      getProfile()
    }
  }, [id])



  const handleChangeImage = (event)=> {
    const file = event.target.files[0];
    if (file) {
        setselectedImage(file)
    }
  }

  const submit = async(data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('age', data.age);
    formData.append('password', data.password);
    if (selectedImage) {
      formData.append('image', selectedImage); // Asegúrate de usar el mismo nombre que el backend espera
    }
    try {
      const token = localStorage.getItem('token')
      const response = await ApisAxios.put(`/users/updateProfile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      const data = response.data
      if (data.message === 'El perfil ha sido actualizado correctamente') {
        toast.success(response.data.message)
        setValuesInitial({
          name: data.name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          age: data.age || '',
          password: '',
          confirmPassword: '',
          img: data.image || ''
        })
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response: ', error.response.data)
        toast.warn(error.response.data.error || 'Error no encontrado')
      } else if (error.request) {
        console.log('Error de la request: ', error.response.data)
        toast.error('No se ha recibido la solicitud')
      } else {
        console.log(error)
        toast.error('Hubo un error al crear el usuario')
      }
    }
  }


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      p: 4,
      borderRadius: 2,
      boxShadow: 3,
      width: '800px',
      margin: '0 auto'
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
              Editar Datos Personales
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={7}>
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
                  Editar Usuario
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Card sx={{
                  maxWidth: 300,
                  boxShadow: 3,
                  marginTop: 2,
                  background: theme.palette.mode === 'dark' ? colors.primary[400] : 'white'
                }}>
                  <CardActionArea>
                    <CardMedia sx={{
                      borderRadius: '50%',
                      fontSize: '50px',
                      width: '170px',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}
                      component="img"
                      height="150"
                      image={selectedImage ? URL.createObjectURL(selectedImage) : `//${values.img}`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Nombre Completo: {values.name} {values.last_name || 'Loading ...'}
                      </Typography>
                      <Divider />
                      <Typography gutterBottom variant="h6" component="div">
                        Correo Electronico: {values.email || 'Loading ...'}
                      </Typography>
                      <Divider />
                      <Typography gutterBottom variant="h6" component="div">
                        Edad: {values.age || 'Loading ...'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <TextField
                    id="file"
                    name="file"
                    label="Adjuntar una imagen"
                    type="file"
                    fullWidth
                    margin="normal"
                    error={!!errors.img}
                    helperText={errors.img}
                    InputLabelProps={{
                      style: { color: colors.grey[100] },
                      shrink: true, // Mantiene la etiqueta visible si hay un archivo
                    }}
                    inputProps={{
                      style: { color: colors.grey[100] },
                      sx: { borderColor: colors.grey[100] },
                      accept: 'image/*', // Acepta solo imágenes
                    }}
                    onChange={handleChangeImage}
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
      <ToastContainer theme={theme.palette.mode === 'dark' ? 'dark' : 'white'}/>
    </Box>
  )
}

export default ProfileUser
