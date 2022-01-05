import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const VaccineCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleBack = () => {
    navigate("/administrative/vaccines");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.post('http://localhost:3001/vaccines/create', {
      nome: data.get('name'),
      fabricante: data.get('fabricante'),
      pais: data.get('pais'),
      doses: Number.parseInt(data.get('doses')),
    }, { withCredentials: true }).then(response => {
      navigate('/administrative/vaccines')
    }).catch(err => {
      setIsErr(true)
      if(err.response?.data?.message) {
        setErr(err.response.data.message)
      }
      else {
        setErr("Erro interno ao cadastrar vacina.")
      }
    })
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Button variant="contained" onClick={handleBack}>
        Voltar
      </Button>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nome"
        name="name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="fabricante"
        label="Fabricante"
        type="text"
        id="fabricante"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="pais"
        label="Pais"
        type="text"
        id="pais"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="doses"
        label="Doses"
        type="text"
        id="doses"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar vacina
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default VaccineCreate;
