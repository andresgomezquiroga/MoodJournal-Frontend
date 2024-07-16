import { useTheme } from '@emotion/react'
import { Container } from '@mui/material'
import React from 'react'
import { BarLoader } from 'react-spinners'
import { tokens } from '../theme'

const Loading = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <BarLoader width={150} color={colors.greenAccent[500]} />
        </Container>
    )
}

export default Loading
