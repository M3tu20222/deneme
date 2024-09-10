import React, { useState, useEffect } from 'react';
import { Button, Input } from '@/components/ui/button';

const FactorGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [foundFactors, setFoundFactors] = useState([]);

  const generateNumber = (level) => {
    const min = level === 1 ? 10 : 100;
    const max = level === 1 ? 99 : 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentNumber(generateNumber(level));
  };

  const checkFactor = () => {
    const guessNum = parseInt(guess);
    if (currentNumber % guessNum === 0 && !foundFactors.includes(guessNum)) {
      setFoundFactors([...foundFactors, guessNum]);
      setScore(score + 1);
      setMessage('Doğru! Yeni bir çarpan buldun!');
      if (foundFactors.length + 1 === getFactorCount(currentNumber)) {
        nextLevel();
      }
    } else {
      setMessage('Tekrar dene!');
    }
    setGuess('');
  };

  const getFactorCount = (num) => {
    let count = 0;
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) count++;
    }
    return count;
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setCurrentNumber(generateNumber(level + 1));
    setFoundFactors([]);
    setMessage(`Tebrikler! ${level + 1}. seviyeye geçtin!`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {!gameStarted ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Çarpan Bulma Oyunu</h2>
          <Input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Adını gir"
            className="mb-2"
          />
          <Button onClick={startGame} disabled={!playerName}>Oyunu Başlat</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Hoş geldin, {playerName}!</h2>
          <p className="mb-2">Seviye: {level}</p>
          <p className="mb-2">Puan: {score}</p>
          <p className="mb-4">Şu sayının çarpanlarını bul: {currentNumber}</p>
          <div className="mb-4">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Bir çarpan tahmin et"
              className="mr-2"
            />
            <Button onClick={checkFactor}>Kontrol Et</Button>
          </div>
          <p className="mb-2">{message}</p>
          <p className="font-bold">Bulunan çarpanlar:</p>
          <ul className="list-disc pl-5">
            {foundFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FactorGame;