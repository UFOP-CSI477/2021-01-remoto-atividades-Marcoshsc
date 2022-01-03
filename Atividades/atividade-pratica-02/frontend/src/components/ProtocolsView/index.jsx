import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFormattedDate } from '../../utils/date'

const ProtocolsView = () => {

  const navigate = useNavigate()
  const [protocolTypes, setProtocolTypes] = useState([])

  const getProtocolTypes = () => {
    axios.get('http://localhost:3001/protocols/', { withCredentials: true }).then(response => {
      setProtocolTypes(response.data)
    })
  }

  useEffect(() => {
    getProtocolTypes()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/protocols/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/protocols/delete/${id}`, { withCredentials: true }).then(() => {
        getProtocolTypes()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/protocols/${id}/edit`)
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
          <Button onClick={handleCreate}>Criar novo protocolo</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Protocolos:</Typography>
        </Grid>
        {protocolTypes.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={2}>
                <Typography>Pessoa: {el.person}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Description: {el.description}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Data: {getFormattedDate(new Date(el.date))}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Tipo de protocolo: {el.subject.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Usuário: {el.user.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Criação: {getFormattedDate(new Date(el.createdAt))}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Atualização: {getFormattedDate(new Date(el.updatedAt))}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={handleEdit(el.id)}>Editar</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={handleDelete(el.id)}>Deletar</Button>
              </Grid>
            </Grid>
          </Grid>
        ))}

      </Grid>
    </Container>
  )
}

export default ProtocolsView