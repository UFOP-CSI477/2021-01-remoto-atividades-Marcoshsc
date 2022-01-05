import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFormattedDate } from '../../utils/date'

const PeopleView = () => {

  const navigate = useNavigate()
  const [peoples, setPeoples] = useState([])

  const getPeoples = () => {
    axios.get('http://localhost:3001/people/', { withCredentials: true }).then(response => {
      setPeoples(response.data)
    })
  }

  useEffect(() => {
    getPeoples()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/people/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/people/delete/${id}`, { withCredentials: true }).then(() => {
        getPeoples()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/people/${id}/edit`)
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
          <Button onClick={handleCreate}>Criar nova pessoa</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Pessoas:</Typography>
        </Grid>
        {peoples.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={2}>
                <Typography>CPF: {el.cpf}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Nome: {el.nome}</Typography>
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

export default PeopleView