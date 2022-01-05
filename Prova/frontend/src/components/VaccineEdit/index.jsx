import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const UnitEdit = () => {

  const { id } = useParams()

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [vaccine, setVaccine] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3001/vaccines/${id}`, { withCredentials: true }).then(response => {
      setVaccine(response.data)
    })
  }, [id])

  const handleBack = () => {
    navigate("/administrative/vaccines");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.put(`http://localhost:3001/vaccines/update/${id}`, {
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
  
  if(!vaccine) {
    return null
  }

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
        defaultValue={vaccine.nome}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="fabricante"
        label="Fabricante"
        type="text"
        id="fabricante"
        defaultValue={vaccine.fabricante}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="pais"
        label="Pais"
        type="text"
        id="pais"
        defaultValue={vaccine.pais}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="doses"
        label="Doses"
        type="text"
        id="doses"
        defaultValue={vaccine.doses}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Editar vacina
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default UnitEdit;
