import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const GeneralArea = () => {
  const [records, setRecords] = useState([])
  const navigate = useNavigate()

  const uniqueVaccines = records.reduce((acc, cur) => ({
    ...acc,
    [cur.vacina.nome]: acc[cur.vacina.nome] ? acc[cur.vacina.nome] + 1 : 1
  }), {})

  const applicationsPerPeople = records.reduce((acc, cur) => ({
    ...acc,
    [cur.pessoa.nome]: acc[cur.pessoa.nome] ? acc[cur.pessoa.nome] + 1 : 1
  }), {})

  const numberOfDoses = Object.values(applicationsPerPeople).reduce((acc, cur) => ({
    ...acc,
    [cur]: acc[cur] ? acc[cur] + 1 : 1
  }), {})

  const total = Object.values(uniqueVaccines).reduce((acc, cur) => acc + cur, 0)

  const getRecords = () => {
    axios.get('http://localhost:3001/records/', { withCredentials: true }).then(response => {
      setRecords(response.data)
    })
  }

  useEffect(() => {
    getRecords()
  }, [])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={handleBack} variant="contained">Voltar</Button>
      </Grid>
      <Grid item xs={12}>
        <h1>Relatório de doses</h1>
      </Grid>
      {Object.keys(numberOfDoses).map(key => {
        const value = numberOfDoses[key]
        return <Grid item xs={12}><p>{value} vacinas foram aplicadas com {key} doses.</p></Grid>
      })}
      <Grid item xs={12}>
        <h1>Relatório por vacina</h1>
      </Grid>
      {Object.keys(uniqueVaccines).map(key => {
        const value = uniqueVaccines[key]
        return <Grid item xs={12}><p>Vacina {key} foi aplicada {value} vezes ({(value / total) * 100}%).</p></Grid>
      })}
      <Grid item xs={12}>
        Total aplicado de vacinas: {total} (100%)
      </Grid>
    </Grid>
  )
}

export default GeneralArea