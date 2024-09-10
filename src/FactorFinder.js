import React, { useState, useEffect } from 'react';

function FactorFinder() {
  const [number, setNumber] = useState(0);
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 90) + 10; // 10-99 arası rastgele sayı
    setNumber(newNumber);
    findFactors(newNumber);
  };

  const findFactors = (num) => {
    const factorList = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factorList.push(i);
      }
    }
    setFactors(factorList);
  };

  return (
    <div className="FactorFinder">
      <h2>Rastgele Sayı: {number}</h2>
      <h3>Çarpanlar:</h3>
      <ul>
        {factors.map((factor, index) => (
          <li key={index}>{factor}</li>
        ))}
      </ul>
      <button onClick={generateRandomNumber}>Yeni Sayı Üret</button>
    </div>
  );
}

export default FactorFinder;