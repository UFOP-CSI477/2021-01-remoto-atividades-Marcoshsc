import { Container, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/date";

const ProtocolTypeReport = () => {

  const navigate = useNavigate()
  const [protocolTypes, setProtocolTypes] = useState([])

  useEffect(() => {
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
      </Grid>
    </Container>
  );
};

export default ProtocolTypeReport;
