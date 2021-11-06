import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCoins = () => {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json')
      console.log(response.data.value)
      const coins = response.data.value
      setCoins(coins)
    }
    fetchCoins()
    return () => {
      setCoins([])
    }
  }, [])

  return coins

}