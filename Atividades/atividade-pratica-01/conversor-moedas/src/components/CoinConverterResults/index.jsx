import React from "react";
import "./styles.scss";

const formatNumber = (n) => {
  return n < 10 ? `0${n}` : `${n}`;
};

const convertDate = (date) => {
  return `${formatNumber(date.getDate())}-${formatNumber(date.getMonth() + 1)}-${date.getFullYear()}`;
};

export default function CoinConverterResults({ date, sourceValue, sourceCoin, targetValue, targetCoin, ready }) {
  return (
    <>
      {ready && (
        <div className="container">
          <h2>Resultado:</h2>
          <p>Data da cotação: {convertDate(date)}</p>
          <p>{`Convertendo ${sourceValue} ${sourceCoin} para ${targetCoin}, temos ${targetValue} ${targetCoin}`}</p>
        </div>
      )}
    </>
  );
}
