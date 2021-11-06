import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "./styles.scss";

const QuotationHistory = ({ coin1Name, coin2Name, quotationCoin1, quotationCoin2, ready }) => {
  const labels = useMemo(() => {
    const greater = quotationCoin1.length > quotationCoin2.length ? quotationCoin1 : quotationCoin2
    return greater.map(el => `${el.dataHoraCotacao.split(' ')[0]}`)
  }, [quotationCoin1, quotationCoin2]);
  return (
    <>
      {ready && (
        <div className="container">
          <h2>
            Cotação das moedas {coin1Name} e {coin2Name} nos últimos 15 dias em relação ao real
          </h2>
          <p>A cotação do real nunca aparecerá, uma vez que é sempre 1 em relação ao real.</p>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: coin1Name,
                  data: quotationCoin1.map(el => el.cotacaoVenda),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
                {
                  label: coin2Name === coin1Name ? `${coin2Name}(2)` : coin2Name,
                  data: quotationCoin2.map(el => el.cotacaoVenda),
                  fill: false,
                  borderColor: "rgb(75, 10, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      )}
    </>
  );
};

export default QuotationHistory;
