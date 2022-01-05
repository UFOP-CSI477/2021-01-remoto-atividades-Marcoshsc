import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getFormattedDateInput } from "../../utils/date";

const UnitEdit = () => {

  const { id } = useParams()

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [unit, setUnit] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3001/units/${id}`, { withCredentials: true }).then(response => {
      setUnit(response.data)
    })
  }, [id])

  const handleBack = () => {
    navigate("/administrative/units");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.put(`http://localhost:3001/units/update/${id}`, {
      nome: data.get('name'),
      bairro: data.get('bairro'),
      cidade: data.get('cidade'),
      estado: data.get('estado'),
      dataNascimento: data.get('date')
    }, { withCredentials: true }).then(response => {
      navigate('/administrative/units')
    }).catch(err => {
      setIsErr(true)
      if(err.response?.data?.message) {
        setErr(err.response.data.message)
      }
      else {
        setErr("Erro interno ao cadastrar unidade.")
      }
    })
  };
  
  if(!unit) {
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
        defaultValue={unit.nome}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="bairro"
        label="Bairro"
        type="text"
        id="bairro"
        defaultValue={unit.bairro}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="cidade"
        label="Cidade"
        type="text"
        id="cidade"
        defaultValue={unit.cidade}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="estado"
        label="Estado"
        type="text"
        id="estado"
        defaultValue={unit.estado}
      />
      <div
        style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "flex-start", alignItems: "center" }}
      >
        <label>Data de nascimento</label>
        <TextField defaultValue={getFormattedDateInput(new Date(unit.dataNascimento))} margin="normal" required fullWidth name="date" type="date" id="date" />
      </div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Editar unidade
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default UnitEdit;
