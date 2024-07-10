import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';

const Register = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
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
                <Box
                    component="form"
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
                        name="confirmPassword"
                        label="Confirmar Contraseña"
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
                    <Link to='/' style={{ listStyle: 'none', color: colors.greenAccent[400], margin: "10px" }}>Regresar Login</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Register
