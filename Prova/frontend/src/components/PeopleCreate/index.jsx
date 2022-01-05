import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const PeopleCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleBack = () => {
    navigate("/administrative/people");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.post('http://localhost:3001/people/create', {
      nome: data.get('name'),
      cpf: data.get('cpf'),
      dataNascimento: data.get('date')
    }, { withCredentials: true }).then(response => {
      navigate('/administrative/people')
    }).catch(err => {
      setIsErr(true)
      if(err.response?.data?.message) {
        setErr(err.response.data.message)
      }
      else {
        setErr("Erro interno ao cadastrar pessoa.")
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
        name="cpf"
        label="CPF"
        type="text"
        id="cpf"
      />
      <div
        style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "flex-start", alignItems: "center" }}
      >
        <label>Data de nascimento</label>
        <TextField margin="normal" required fullWidth name="date" type="date" id="date" />
      </div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar pessoa
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default PeopleCreate;
