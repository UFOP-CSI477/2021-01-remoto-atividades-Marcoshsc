import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const MainPage = () => {

  const navigate = useNavigate()

  const goToAdministrativeArea = () => {
    navigate('/administrative')
  }

  const goToGeneralArea = () => {
    navigate('/general')
  }

  return (
    <Container maxWidth="100%">
      <Typography component="h1">Sistema de controle de vacinação</Typography>
      <Button variant="contained" color="primary" onClick={goToGeneralArea}>Área Geral</Button>
      <Button variant="contained" color="primary" onClick={goToAdministrativeArea}>Área Administrativa</Button>
    </Container>
  )
}

export default MainPage