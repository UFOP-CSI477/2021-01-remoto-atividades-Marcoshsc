import axios from "axios";
import { useCallback, useState } from "react";

const getDateString = (date) => {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const useCoinConverter = () => {
  const [convertedValue, setConvertedValue] = useState();
  const [sourceCoin, setSourceCoin] = useState("");
  const [destinationCoin, setDestinationCoin] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState()

  const getQuotation = async (coin, date) => {
    if(coin === 'BRL') {
      return [{ cotacaoVenda: 1 }]
    }
    let currentDate = new Date(date);
    let quotations = [];
    let i = 0;
    while (quotations.length === 0 && i < 7) {
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${coin}'&@dataCotacao='${getDateString(
          currentDate
        )}'&$top=100&$format=json`
      );
      quotations = response.data.value;
      var dateOffset = 24 * 60 * 60 * 1000;
      currentDate.setTime(currentDate.getTime() - dateOffset);
      i++;
    }
    return quotations;
  };

  const handleSubmit = useCallback(async (coin1, coin2, value, date) => {
    const [quotations1, quotations2] = await Promise.all([getQuotation(coin1, date), getQuotation(coin2, date)]);

    if (quotations1.length === 0 || quotations2.length === 0) {
      return;
    }

    const quotation1 = quotations1[quotations1.length - 1].cotacaoVenda;
    const quotation2 = quotations2[quotations2.length - 1].cotacaoVenda;

    const converted = (quotation1 * value) / quotation2;
    setSourceCoin(coin1);
    setDestinationCoin(coin2);
    setValue(value);
    setDate(date)
    setConvertedValue(converted);
  }, []);

  return {
    convertedValue,
    handleSubmit,
    sourceCoin,
    destinationCoin,
    value,
    date
  };
};
