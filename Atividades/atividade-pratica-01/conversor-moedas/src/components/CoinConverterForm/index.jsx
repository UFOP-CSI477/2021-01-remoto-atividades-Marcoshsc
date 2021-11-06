import React, { useState } from 'react'
import './styles.scss'

const formatNumber = (n) => {
  return n < 10 ? `0${n}` : `${n}`
}

const getDateString = (date) => {
  return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())}`;
};

export default function CoinConverterForm({ coins, onSubmit }) {

  const [sourceCoin, setSourceCoin] = useState('')
  const [destinationCoin, setDestinationCoin] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState(getDateString(new Date()))

  const handleSubmit = (e) => {
    e.preventDefault()
    if(sourceCoin === '' || destinationCoin === '' || value === '') {
      alert('Preencha todos os campos!')
    }
    else {
      onSubmit(sourceCoin, destinationCoin, value, new Date(date))
    }
  }

  const handleChange = (callback) => {
    return (e) => {
      callback(e.target.value)
    }
  }

  return (
    <div className="container">
      <form className="coinForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="coins-select">Moeda origem:</label>
          <select name="coins-select" value={sourceCoin} onChange={handleChange(setSourceCoin)} >
            <option value={''}>Selecione</option>
            <option value={'BRL'}>Real</option>
            {coins.map(coin => (
              <option value={coin.simbolo} key={coin.simbolo}>{coin.nomeFormatado}</option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="coins-select">Moeda destino:</label>
          <select name="coins-select" value={destinationCoin} onChange={handleChange(setDestinationCoin)}>
            <option value={''}>Selecione</option>
            <option value={'BRL'}>Real</option>
            {coins.map(coin => (
              <option value={coin.simbolo} key={coin.simbolo}>{coin.nomeFormatado}</option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="date-select">Data da cotação: </label>
          <input type="date" value={date} onChange={handleChange(setDate)}  />
        </div>
        <div className="inputGroup">
          <label htmlFor="value">Valor: </label>
          <input type="number" name="value" min={0} step="any" value={value} onChange={handleChange(setValue)}/>
        </div>
        <button type="submit">Calcular</button>
      </form>
    </div>
  )
}