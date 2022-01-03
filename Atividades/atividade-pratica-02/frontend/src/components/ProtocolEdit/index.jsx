import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getFormattedDateInput } from "../../utils/date";

const ProtocolEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [protocol, setProtocol] = useState();

  const handleBack = () => {
    navigate("/administrative/protocols");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/subjects", { withCredentials: true }).then((response) => {
      setSubjects(response.data);
    });
    axios.get("http://localhost:3001/user", { withCredentials: true }).then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if(!protocol) {
      return
    }
    setSelectedUser(protocol.userId)
  }, [protocol])

  useEffect(() => {
    if(!protocol) {
      return
    }
    setSelectedSubject(protocol.subjectId)
  }, [protocol])

  useEffect(() => {
    axios.get(`http://localhost:3001/protocols/${id}`, { withCredentials: true }).then((response) => {
      setProtocol(response.data);
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios
      .put(
        `http://localhost:3001/protocols/update/${id}`,
        {
          person: data.get("person"),
          description: data.get("description"),
          date: data.get("date"),
          userId: selectedUser,
          subjectId: selectedSubject
        },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/administrative/protocols");
      })
      .catch((err) => {
        setIsErr(true);
        if (err.response?.data?.message) {
          setErr(err.response.data.message);
        } else {
          setErr("Erro interno ao cadastrar tipo de protocolo.");
        }
      });
  };

  if (!protocol) {
    return "Protocolo não encontrado.";
  }

  return (
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
      }}
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Button variant="contained" onClick={handleBack}>
        Voltar
      </Button>
      <TextField defaultValue={protocol.person} margin="normal" required fullWidth id="person" label="Pessoa" name="person" />
      <TextField defaultValue={protocol.description} margin="normal" required fullWidth name="description" label="Descrição" id="description" />
      <div
        style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "flex-start", alignItems: "center" }}
      >
        <label>Data</label>
        <TextField defaultValue={getFormattedDateInput(new Date(protocol.date))} margin="normal" required fullWidth name="date" type="date" id="date" />
      </div>
      <FormControl fullWidth>
        <InputLabel id="subject-label">Tipo de protocolo</InputLabel>
        <Select
          variant="outlined"
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          fullWidth
          labelId="subject-label"
          id="subject"
          label="Tipo de protocolo"
        >
          {subjects.map((subject) => (
            <MenuItem value={subject.id}>{subject.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="user-label">Usuário</InputLabel>
        <Select
          variant="outlined"
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
          fullWidth
          labelId="user-label"
          id="user"
          label="Usuário"
        >
          {users.map((user) => (
            <MenuItem value={user.id}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar protocolo
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default ProtocolEdit;
