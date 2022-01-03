import React, { useContext, useEffect } from "react";
import { Grid, Button, Container } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { LoggedContext } from "../Router";

const AdministrativeArea = () => {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(LoggedContext);

  useEffect(() => {
    if(!logged) {
      axios.get('http://localhost:3001/user/me', { withCredentials: true }).then(() => {
        setLogged(true)
      })
    }
  }, [logged, setLogged])

  const handleSignin = () => {
    navigate("/administrative/login");
  };

  const handleSignup = () => {
    navigate("/administrative/signup");
  };

  const handleLogout = () => {
    axios.post("http://localhost:3001/auth/logout", undefined, { withCredentials: true }).then(() => {
      setLogged(false);
    });
  };

  const handleBack = () => {
    navigate('/')
  }

  const goToProtocolTypes = () => {
    navigate('/administrative/protocol-types')
  }

  const goToProtocols = () => {
    navigate('/administrative/protocols')
  }

  const handleProtocolAndTypeReport = () => {
    navigate('/administrative/protocol-and-type-report')
  }

  const handleGoToUsersReport = () => {
    navigate('/administrative/users-report')
  }

  return (
    <Container maxWidth="100%" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        {!logged && (
          <>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSignup}>
                Novo usuário
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSignin}>
                Acesso à area administrativa
              </Button>
            </Grid>
          </>
        )}
        {logged && (
          <>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={goToProtocolTypes}>
                Tipos de protocolos
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={goToProtocols}>
                Protocolos
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleProtocolAndTypeReport}>
                Relatório de protocolos e tipos de protocolos
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleGoToUsersReport}>
                Relatório de usuários
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Sair do sistema
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdministrativeArea;
