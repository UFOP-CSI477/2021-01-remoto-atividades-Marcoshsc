import { useMemo } from "react";
import CoinConverterForm from "./components/CoinConverterForm";
import CoinConverterResults from "./components/CoinConverterResults";
import QuotationHistory from "./components/QuotationHistory";
import { useCoins } from "./hooks/coin";
import { useCoinConverter } from "./hooks/converter";
import { useQuotationHistory } from "./hooks/quotation";

function App() {
  const coins = useCoins();
  const { convertedValue, destinationCoin, sourceCoin, value, handleSubmit, date } = useCoinConverter();
  const { calculateQuotation, quotation1, quotation2, ready } = useQuotationHistory();

  const coin1Name = useMemo(() => {
    return coins.find((c) => c.simbolo === sourceCoin)?.nomeFormatado || "Real";
  }, [coins, sourceCoin]);

  const coin2Name = useMemo(() => {
    return coins.find((c) => c.simbolo === destinationCoin)?.nomeFormatado || "Real";
  }, [coins, destinationCoin]);

  const handleSubmitGeneral = (coin1, coin2, value, date) => {
    handleSubmit(coin1, coin2, value, date)
    calculateQuotation(coin1, coin2, date)
  }

  return (
    <>
      <CoinConverterForm coins={coins} onSubmit={handleSubmitGeneral} />
      <CoinConverterResults
        ready={convertedValue}
        date={date}
        sourceCoin={coin1Name}
        sourceValue={Number.parseFloat(value)}
        targetCoin={coin2Name}
        targetValue={convertedValue}
      />
      <QuotationHistory
        coin1Name={coin1Name}
        coin2Name={coin2Name}
        quotationCoin1={quotation1}
        quotationCoin2={quotation2}
        ready={ready}
      />
    </>
  );
}

export default App;
