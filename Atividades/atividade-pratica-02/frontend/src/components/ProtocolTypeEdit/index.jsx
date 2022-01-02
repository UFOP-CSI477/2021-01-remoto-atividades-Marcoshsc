import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const ProtocolTypeEdit = () => {

  const { id } = useParams()

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [subject, setSubject] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3001/subjects/${id}`, { withCredentials: true }).then(response => {
      setSubject(response.data)
    })
  }, [id])

  const handleBack = () => {
    navigate("/administrative/protocol-types");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.put(`http://localhost:3001/subjects/update/${id}`, {
      name: data.get('name'),
      price: Number.parseInt(data.get('price'))
    }, { withCredentials: true }).then(response => {
      navigate('/administrative/protocol-types')
    }).catch(err => {
      setIsErr(true)
      if(err.response?.data?.message) {
        setErr(err.response.data.message)
      }
      else {
        setErr("Erro interno ao cadastrar tipo de protocolo.")
      }
    })
  };
  
  if(!subject) {
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
        defaultValue={subject.name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="price"
        label="Preço"
        type="number"
        id="price"
        defaultValue={subject.price}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Editar tipo de protocolo
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default ProtocolTypeEdit;
