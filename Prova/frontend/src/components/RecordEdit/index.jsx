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

  const [peoples, setPeoples] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [record, setRecord] = useState();

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

  useEffect(() => {
    if(!record) {
      return
    }
    setSelectedPeople(record.pessoaId)
    setSelectedVaccine(record.vacinaId)
    setSelectedUnit(record.unidadeId)
  }, [record])

  useEffect(() => {
    axios.get(`http://localhost:3001/records/${id}`, { withCredentials: true }).then((response) => {
      setRecord(response.data);
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios
      .put(
        `http://localhost:3001/records/update/${id}`,
        {
          data: data.get("date"),
          pessoaId: selectedPeople,
          unidadeId: selectedUnit,
          vacinaID: selectedVaccine
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
          setErr("Erro interno ao cadastrar registro.");
        }
      });
  };

  if (!record) {
    return "Registro não encontrado.";
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
      <div
        style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "flex-start", alignItems: "center" }}
      >
        <label>Data</label>
        <TextField defaultValue={getFormattedDateInput(new Date(record.data))} margin="normal" required fullWidth name="date" type="date" id="date" />
      </div>
      <FormControl fullWidth>
        <InputLabel id="subject-label">Vacina</InputLabel>
        <Select
          variant="outlined"
          value={selectedVaccine || ""}
          onChange={(e) => setSelectedVaccine(e.target.value)}
          fullWidth
          labelId="subject-label"
          id="subject"
          label="Vacina"
        >
          {vaccines.map((subject) => (
            <MenuItem value={subject.id}>{subject.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="user-label">Pessoa</InputLabel>
        <Select
          variant="outlined"
          value={selectedPeople || ""}
          onChange={(e) => setSelectedPeople(e.target.value)}
          fullWidth
          labelId="user-label"
          id="user"
          label="Pessoa"
        >
          {peoples.map((user) => (
            <MenuItem value={user.id}>{user.name}</MenuItem>
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
            <MenuItem value={unit.id}>{unit.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar registro
      </Button>
      {isErr && <Typography>{err}</Typography>}
    </Box>
  );
};

export default ProtocolEdit;
