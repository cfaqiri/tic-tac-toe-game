import { useState, useEffect, useRef } from "react";
import classes from "./Grid.module.css";
import WinnerModal from "./UI/WinnerModal";

export default function Grid() {
  const defaultGridValues = [...Array(9).fill("")];

  const playerTurn = useRef(true);

  // Track the first render of the component
  // const firstUpdate = useRef(true);

  // Variable to check number of clicks
  const nTurns = useRef(0);
  const [gridValues, setGridValues] = useState(defaultGridValues);
  // Redo the "any"
  const [winner, setWinner] : any = useState(false);

  useEffect(() => {
    // console.log("rendering");
    // Ensure that component doesn't run twice on first render 
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // } 
    
    // function to check if all array values are the same except when is empty
    const allEqual = (arr: string[]) => arr.every(v => arr[0] !== "" && v === arr[0])

    // Looks like when we want to use a function inside useEffect we have to define it
    // inside useEffect.
    const hasWon = (): boolean => {
      // wins 0-2, 3-5, 6-8 in a row
      for (let i = 0; i < 3; i++) {
        let indexes: number[] = [0 + i*3, 1 + i*3, 2 + i*3];
        let rowArr: string[] = indexes.map(i => gridValues[i]);
        if (allEqual(rowArr)) {
          return true
        }
      }

      // wins 0-3-6, 1-4-7, 2-5-8 in a col
      for (let i = 0; i < 3; i++) {
        let indexes: number[] = [0*3 + i, 1*3 + i, 2*3 + i];
        let colArr: string[] = indexes.map(i => gridValues[i]);
        if (allEqual(colArr)) {
          return true
        }
      }

      // wins 0-4-8
      const firstDiagonalArr: string[] = [0, 4, 8].map(i => gridValues[i]);
      if (allEqual(firstDiagonalArr)) {
        return true
      }

      // wins 2-4-6
      const secondDiagonalArr: string[] = [2, 4, 6].map(i => gridValues[i]);
      if (allEqual(secondDiagonalArr)) {
        return true
      }

      return false;
    };

    if (hasWon()) {
      // Using !playerTurn.current to get which player was previous turn
      const winner: 1 | 2 = !playerTurn.current ? 1 : 2;
      setWinner({
        title: "End of Game",
        message: `Player ${winner} has won!`
      })

    // Check if it's a tie (when 9 clicks were made)
    } else if (nTurns.current === 9) {
      setWinner({
        title: "End of Game",
        message: `It's a tie!`
      })
    }
  }, [gridValues]);

  const inputSymbol = (index: number) => (event: any) => {
    // Boxes shouldn't be clicked more than once
    if (gridValues[index] !== "") {
      return;
    }

    let mark: string;
    mark = playerTurn.current ? "X" : "O";

    const temporaryArray: string[] = [...gridValues];
    temporaryArray[index] = mark;
    // Problem: Before we changed player's turn inside useEffect so it was affected
    // by rendering when starting the app.
    // Solution: Player's turn must be changed when clicked on boxes
    playerTurn.current = !playerTurn.current;
    setGridValues(temporaryArray);
    // When a click happens we count until it reach 9
    nTurns.current++
  };

  const winnerHandler = () => {
    setWinner(null);
    setGridValues(defaultGridValues);
    playerTurn.current = true;
    nTurns.current = 0;
    // firstUpdate.current = true;
  };

  return (
    <div>
      {winner && <WinnerModal title={winner.title} message={winner.message} onConfirm={winnerHandler} />}
      <div className={classes.gameboard}>
        {gridValues.map((value, index) => (
          <div
            key={"box-" + index}
            className={classes.box}
            onClick={inputSymbol(index)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
