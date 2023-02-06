import { useEffect, useState } from 'react'
import './App.scss'

/*
  DESAFIO TÉCNICO - JOGO DA VELHA - por Leonardo Morais Franca
  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.
  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/

const winningCombinations = [
  // h
  { indexes: [0, 1, 2], orientation: 'horizontal' },
  { indexes: [3, 4, 5], orientation: 'horizontal' },
  { indexes: [6, 7, 8], orientation: 'horizontal' },

  // v
  { indexes: [0, 3, 6], orientation: 'vertical' },
  { indexes: [1, 4, 7], orientation: 'vertical' },
  { indexes: [2, 5, 8], orientation: 'vertical' },


  // d
  { indexes: [0, 4, 8], orientation: 'diagonal-1' },
  { indexes: [2, 4, 6], orientation: 'diagonal-2' },
];

function App() {

  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState(null);
  const [ended, setEnded] = useState(null);

  const handleClick = (clickedIndex) => {
    if (gameData[clickedIndex] !== 0) {
      return;
    }

    if (winningCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    });

    setTurn((prev) => prev === 1 ? 2 : 1);

  };

  useEffect(() => {
    checkWinner();
    checkGameEnded();
  }, [gameData])

  const checkGameEnded = () => {
    if (gameData.every((item) => item !== 0)) {
      setTurn(0);
      setEnded('The game has ended!');
    }
  }

  const checkWinner = () => {
    let winner = null;

    for (let combination of winningCombinations) {
      const { indexes } = combination;
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = 'player1';
      }

      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = 'player2';
      }

      if (winner) {
        setWinningCombo(combination);
        break;
      }

    }

  }

  return (

    <>
      {winningCombo && <p className='text-2xl text-green-500 mb-2'>We have a winner!</p>}
      {ended && !winningCombo ? <p className='text-2xl text-red-500 mb-2'>{ended}</p> : null}
      {turn === 1 && !winningCombo && <p className='text-2xl text-gray-600 mb-2'>Instead of:❌</p>}
      {turn === 2 && !winningCombo && <p className='text-2xl text-gray-600 mb-2'>Instead of:⭕</p>}
      <div className="board-game w-tab h-tab bg-white flex flex-wrap justify-center">

        {gameData.map((value, index) => {
          return (
            <span
              key={index}
              onClick={() => { handleClick(index) }}
              className={winningCombo?.indexes.includes(index) ? winningCombo.orientation+" w-1/3 flex items-center justify-center text-2xl text-stone-800 hover:bg-gray-100 hover:cursor-pointer relative outline outline-1 outline-gray-300" : undefined+" w-1/3 flex items-center justify-center text-2xl text-stone-800 hover:bg-gray-100 hover:cursor-pointer relative outline outline-1 outline-gray-300"}>
              <abbr className='text-2xl text-gray-400 absolute top-3 left-3' title="">{index}</abbr>
              {value === 1 && '❌'}
              {value === 2 && '⭕'}
            </span>
          )
        })}

      </div>
    </>

  )



}

export default App
