import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFormattedDate } from '../../utils/date'

const VaccineView = () => {

  const navigate = useNavigate()
  const [vaccines, setVaccines] = useState([])

  const getVaccines = () => {
    axios.get('http://localhost:3001/vaccines/', { withCredentials: true }).then(response => {
      setVaccines(response.data)
    })
  }

  useEffect(() => {
    getVaccines()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/vaccines/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/vaccines/delete/${id}`, { withCredentials: true }).then(() => {
        getVaccines()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/vaccines/${id}/edit`)
    }
  }

  const handleBack = () => {
    navigate('/administrative')
  }

  return (
    <Container maxWidth="100%" style={{padding: 20}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={handleBack}>Voltar</Button>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleCreate}>Criar nova Vacina</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Vacinas:</Typography>
        </Grid>
        {vaccines.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={2}>
                <Typography>Nome: {el.nome}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Fabricante: {el.fabricante}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Pais: {el.pais}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>doses: {el.doses}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Criação: {getFormattedDate(new Date(el.createdAt))}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Atualização: {getFormattedDate(new Date(el.updatedAt))}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleEdit(el.id)}>Editar</Button>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleDelete(el.id)}>Deletar</Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default VaccineView