import React, { useEffect, useState } from "react";
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import axios from "axios";
import "./App.scss";

function App() {
  const [operations, setOperations] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [keyType, setKeyType] = useState("");
  const [key, setKey] = useState("");
  const [operationType, setOperationType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [finalized, setFinalized] = useState(false);
  const [sendingTotal, setSendingTotal] = useState(0);
  const [receivingTotal, setReceivingTotal] = useState(0);

  useEffect(() => {
    axios.get("https://brasilapi.com.br/api/banks/v1").then((response) => {
      const banks = response.data;
      setBanks(banks);
    });
    return () => {
      setBanks([]);
    };
  }, []);

  const handleChange = (cb) => {
    return (e) => {
      cb(e.target.value);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedValue = Number.parseFloat(value);
    console.log(parsedValue);
    if (isNaN(parsedValue)) {
      alert("Valor da transação inválido.");
      return;
    }
    const bank = banks.find((el) => el.ispb === selectedBank);
    if (!bank) {
      alert("Banco não encontrado!.");
      return;
    }
    if (keyType === "") {
      alert("Informe o tipo da chave.");
      return;
    }
    if (operationType === "") {
      alert("Informe o tipo de operação.");
      return;
    }
    if (key === "") {
      alert("Informe uma chave PIX.");
      return;
    }
    if (date === "") {
      alert("Informe a data da transação.");
      return;
    }
    const operation = {
      selectedBank: bank.fullName,
      keyType,
      key,
      operationType,
      value: parsedValue,
      date,
    };
    setOperations([...operations, operation]);
  };

  const handleFinish = () => {
    let receivingTotal = 0;
    let sendingTotal = 0;
    operations.forEach((operation) => {
      if (operation.operationType === "Recebimento") {
        receivingTotal += operation.value;
      } else {
        sendingTotal += operation.value;
      }
    });
    setFinalized(true);
    setReceivingTotal(receivingTotal);
    setSendingTotal(sendingTotal);
  };

  const unfinish = () => {
    setFinalized(false);
  };

  return (
    <div className="container">
      <form className="inputArea" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="banks">Banco: </label>
          <Select variant="outlined" name="banks" value={selectedBank} onChange={handleChange(setSelectedBank)}>
            {banks.map((bank) => (
              <MenuItem key={bank.ispb} value={bank.ispb}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="inputGroup">
          <label htmlFor="keyType">Tipo da chave: </label>
          <Select variant="outlined" name="keyType" value={keyType} onChange={handleChange(setKeyType)}>
            <MenuItem value="CPF">CPF</MenuItem>
            <MenuItem value="CNPJ">CNPJ</MenuItem>
            <MenuItem value="E-mail">E-mail</MenuItem>
            <MenuItem value="Celular">Celular</MenuItem>
            <MenuItem value="Aleatória">Aleatória</MenuItem>
          </Select>
        </div>
        <div className="inputGroup">
          <label htmlFor="key">Chave: </label>
          <TextField value={key} variant="outlined" onChange={handleChange(setKey)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="operationType">Tipo de operação: </label>
          <Select
            variant="outlined"
            name="operationType"
            value={operationType}
            onChange={handleChange(setOperationType)}
          >
            <MenuItem value="Envio">Envio</MenuItem>
            <MenuItem value="Recebimento">Recebimento</MenuItem>
          </Select>
        </div>
        <div className="inputGroup">
          <label htmlFor="keyType">Valor: </label>
          <TextField value={value} variant="outlined" onChange={handleChange(setValue)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="keyType">Data: </label>
          <TextField type="date" value={date} onChange={handleChange(setDate)} />
        </div>
        <div className="inputGroup">
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
      </form>
      <div className="results">
        {!finalized && (
          <>
            <div className="header">
              <h2>Operações feitas:</h2>
              <Button onClick={handleFinish} variant="contained" color="primary">
                Finalizar
              </Button>
            </div>
            {operations.map((el, idx) => (
              <div key={idx} className="operation">
                <p>Banco: {el.selectedBank}</p>
                <p>Tipo da chave: {el.keyType}</p>
                <p>Chave: {el.key}</p>
                <p>Tipo da operação: {el.operationType}</p>
                <p>Valor: {el.value}</p>
                <p>Data: {el.date}</p>
              </div>
            ))}
          </>
        )}
        {finalized && (
          <>
            <div className="finalResults">
              <div className="header">
                <h2>Resultado:</h2>
                <Button onClick={unfinish} variant="contained" color="primary">
                  Registrar mais transferências
                </Button>
              </div>
              <p>Total de recebimentos: R$ {receivingTotal}</p>
              <p>Total de envios: R$ {sendingTotal}</p>
              <p>Saldo final: R$ {receivingTotal - sendingTotal}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
