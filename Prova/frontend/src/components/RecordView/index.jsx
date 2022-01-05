import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFormattedDate } from '../../utils/date'

const RecordView = () => {

  const navigate = useNavigate()
  const [records, setRecords] = useState([])

  const getRecords = () => {
    axios.get('http://localhost:3001/records/', { withCredentials: true }).then(response => {
      setRecords(response.data)
    })
  }

  useEffect(() => {
    getRecords()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/records/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/records/delete/${id}`, { withCredentials: true }).then(() => {
        getRecords()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/records/${id}/edit`)
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
          <Button onClick={handleCreate}>Criar novo registro</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Registros:</Typography>
        </Grid>
        {records.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={2}>
                <Typography>Pessoa: {el.pessoa.nome}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Vacina: {el.vacina.nome}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Unidade: {el.unidade.nome}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Data: {getFormattedDate(new Date(el.data))}</Typography>
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

export default RecordView