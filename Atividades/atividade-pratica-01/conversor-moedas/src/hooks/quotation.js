import axios from "axios";
import { useState } from "react"

const getDateString = (date) => {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const useQuotationHistory = () => {
  const [ready, setReady] = useState(false)
  const [quotation1, setQuotation1] = useState([])
  const [quotation2, setQuotation2] = useState([])

  const getQuotation = async (coin, initialDate, finalDate) => {
    if (coin === 'BRL') {
      return []
    }
    const response = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${coin}'&@dataInicial='${getDateString(initialDate)}'&@dataFinalCotacao='${getDateString(finalDate)}'&$top=100&$format=json`) 
    return response.data.value
  }

  const calculateQuotation = async (coin1, coin2, date) => {
    const initialDate = new Date()
    var dateOffset = 24 * 60 * 60 * 1000 * 15;
    initialDate.setTime(date.getTime() - dateOffset)

    const [quotation1, quotation2] = await Promise.all([getQuotation(coin1, initialDate, date), getQuotation(coin2, initialDate, date)])
    setQuotation1(quotation1.filter(el => el.tipoBoletim === "Fechamento"))
    setQuotation2(quotation2.filter(el => el.tipoBoletim === "Fechamento"))
    setReady(true)
  }

  return {
    ready,
    quotation1,
    quotation2,
    calculateQuotation
  }
}