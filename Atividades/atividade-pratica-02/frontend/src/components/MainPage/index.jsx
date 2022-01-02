import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const MainPage = () => {

  const navigate = useNavigate()

  const goToAdministrativeArea = () => {
    navigate('/administrative')
  }

  return (
    <Container maxWidth="100%">
      <Typography component="h1">Sistema de controle de protocolos</Typography>
      <Button variant="contained" color="primary">Área Geral</Button>
      <Button variant="contained" color="primary" onClick={goToAdministrativeArea}>Área Administrativa</Button>
    </Container>
  )
}

export default MainPage