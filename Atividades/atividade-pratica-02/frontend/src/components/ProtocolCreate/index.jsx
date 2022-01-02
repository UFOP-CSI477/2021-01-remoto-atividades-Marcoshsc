import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const ProtocolCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [users, setUsers] = useState([])
  const [subjects, setSubjects] = useState([])

  const handleBack = () => {
    navigate("/administrative/protocols");
  };

  useEffect(() => {
    
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.post('http://localhost:3001/protocols/create', {
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
        setErr("Erro interno ao cadastrar protocolo.")
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
        id="person"
        label="Pessoa"
        name="person"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Descrição"
        id="description"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="date"
        label="Data"
        type="date"
        id="date"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar protocolo
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default ProtocolCreate;
