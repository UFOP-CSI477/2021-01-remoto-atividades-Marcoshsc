import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const RecordCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);

  const [peoples, setPeoples] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState()
  const [selectedVaccine, setSelectedVaccine] = useState()
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState();

  const handleBack = () => {
    navigate("/administrative/records");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/vaccines", { withCredentials: true }).then((response) => {
      setVaccines(response.data);
    });
    axios.get("http://localhost:3001/people", { withCredentials: true }).then((response) => {
      setPeoples(response.data);
    });
    axios.get("http://localhost:3001/units", { withCredentials: true }).then((response) => {
      setUnits(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios
      .post(
        "http://localhost:3001/records/create",
        {
          data: data.get("date"),
          pessoaId: selectedPeople,
          unidadeId: selectedUnit,
          vacinaId: selectedVaccine
        },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/administrative/records");
      })
      .catch((err) => {
        setIsErr(true);
        if (err.response?.data?.message) {
          setErr(err.response.data.message);
        } else {
          setErr("Erro interno ao cadastrar protocolo.");
        }
      });
  };

  return (
    <Box
      component="form"
      style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "flex-start", alignItems: "flex-start", padding: 20 }}
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Button variant="contained" onClick={handleBack}>
        Voltar
      </Button>
      <div
        style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "flex-start", alignItems: "center" }}
      >
        <label>Data</label>
        <TextField margin="normal" required fullWidth name="date" type="date" id="date" />
      </div>
      <FormControl fullWidth>
        <InputLabel id="subject-label">Vacina</InputLabel>
        <Select variant="outlined" value={selectedVaccine} onChange={e => setSelectedVaccine(e.target.value)} fullWidth labelId="subject-label" id="subject" label="Tipo de protocolo">
          {vaccines.map((vaccine) => (
            <MenuItem value={vaccine.id}>{vaccine.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="user-label">Pessoa</InputLabel>
        <Select variant="outlined" value={selectedPeople} onChange={e => setSelectedPeople(e.target.value)} fullWidth labelId="user-label" id="user" label="Usuário">
          {peoples.map((people) => (
            <MenuItem value={people.id}>{people.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="user-label">Unidade</InputLabel>
        <Select
          variant="outlined"
          value={selectedUnit || ""}
          onChange={(e) => setSelectedUnit(e.target.value)}
          fullWidth
          labelId="unit-label"
          id="unit"
          label="Unidade" >
          {units.map((unit) => (
            <MenuItem value={unit.id}>{unit.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar vacina
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default RecordCreate;
