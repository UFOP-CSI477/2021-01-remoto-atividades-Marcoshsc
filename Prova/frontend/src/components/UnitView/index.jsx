import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFormattedDate } from '../../utils/date'

const UnitView = () => {

  const navigate = useNavigate()
  const [units, setUnits] = useState([])

  const getUnits = () => {
    axios.get('http://localhost:3001/units/', { withCredentials: true }).then(response => {
      setUnits(response.data)
    })
  }

  useEffect(() => {
    getUnits()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/units/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/units/delete/${id}`, { withCredentials: true }).then(() => {
        getUnits()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/units/${id}/edit`)
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
          <Button onClick={handleCreate}>Criar nova Unidade</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Unidades:</Typography>
        </Grid>
        {units.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={2}>
                <Typography>Nome: {el.nome}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Bairro: {el.bairro}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Cidade: {el.cidade}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Estado: {el.estado}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Data de nascimento: {getFormattedDate(new Date(el.dataNascimento))}</Typography>
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

export default UnitView