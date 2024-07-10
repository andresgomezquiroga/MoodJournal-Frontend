import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [iserror, setiserror] = useState(false)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)


    const submit = (e) => {
        e.preventDefault()
        if (email.trim() !== '' || password.trim() !== '') {
            console.log(email)
            console.log(password)
            setiserror(false)
        }
        else {
            setiserror(true)
            console.log('Campo vacio')
        }
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
                <Box
                    component="form"
                    onSubmit={submit}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        error={iserror}
                        helperText={iserror ? 'Campo esta vacio' : ''}
                    />

                    <TextField
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        error={iserror}
                        helperText={iserror ? 'Campo esta vacio' : ''}
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
                    <Link to='/register' style={{listStyle: 'none', color: colors.greenAccent[400], margin: "10px"}}>Registrarse usuario</Link>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
