import { Container, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/date";

const ProtocolAndTypeReport = () => {

  const navigate = useNavigate()
  const [protocols, setProtocols] = useState([])
  const [protocolTypes, setProtocolTypes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/protocols', { withCredentials: true }).then(response => {
      setProtocols(response.data)
    })
    axios.get('http://localhost:3001/subjects', { withCredentials: true }).then(response => {
      setProtocolTypes(response.data)
    })
  }, [])

  const handleBack = () => {
    navigate('/administrative')
  }

  return (
    <Container maxWidth="100%" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleBack}>Voltar</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>Protocolos</Typography>
        </Grid>
        {protocols.map((el) => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{ padding: 20 }}>
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
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography>Tipos de Protocolo</Typography>
        </Grid>
        {protocolTypes.map((el) => (
          <Grid key={el.id} item xs={12}>
            <Grid container maxWidth="100%" style={{ padding: 20 }}>
              <Grid item xs={3}>
                <Typography>Nome: {el.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Preço: {el.price}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Criação: {getFormattedDate(new Date(el.createdAt))}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Atualização: {getFormattedDate(new Date(el.updatedAt))}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Typography>Quantidade de protocolos: {protocols.length}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Valor total: {protocols.reduce((prev, protocol) => prev + protocol.subject.price, 0)}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProtocolAndTypeReport;
