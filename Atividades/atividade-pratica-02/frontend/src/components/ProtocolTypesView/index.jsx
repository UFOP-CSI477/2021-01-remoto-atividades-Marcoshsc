import React, { useEffect, useState } from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProtocolTypesView = () => {

  const navigate = useNavigate()
  const [protocolTypes, setProtocolTypes] = useState([])

  const getProtocolTypes = () => {
    axios.get('http://localhost:3001/subjects/', { withCredentials: true }).then(response => {
      setProtocolTypes(response.data)
    })
  }

  useEffect(() => {
    getProtocolTypes()
  }, [])

  const handleCreate = () => {
    navigate('/administrative/protocol-types/create')
  }

  const handleDelete = (id) => {
    return () => {
      axios.delete(`http://localhost:3001/subjects/delete/${id}`, { withCredentials: true }).then(() => {
        getProtocolTypes()
      })
    }
  }

  const handleEdit = (id) => {
    return () => {
      navigate(`/administrative/protocol-types/${id}/edit`)
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
          <Button onClick={handleCreate}>Criar novo tipo de protocolo</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Protocolos:</Typography>
        </Grid>
        {protocolTypes.map(el => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{padding: 20}}>
              <Grid item xs={3}>
                <Typography>Nome: {el.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Preço: {el.price}</Typography>
              </Grid>
              <Grid item xs={3}>
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

export default ProtocolTypesView