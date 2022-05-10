import { useState, useEffect, useRef } from "react";
import classes from "./Grid.module.css";

export default function Grid() {
  const defaultGridValues = [...Array(9).fill("")];
  const didMount = useRef(false);

  const [playerTurn, setPlayerTurn] = useState(true);
  const [gridValues, setGridValues] = useState(defaultGridValues);

  const hasWon = (): boolean => {
    if (
      gridValues[0] !== "" &&
      gridValues[0] === gridValues[1] &&
      gridValues[1] === gridValues[2]
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (didMount.current) {
      if (hasWon()) {
        const winner: 1|2 = playerTurn ?  1 : 2;
        alert(`Winner: Player ${winner}!`);
      } else {
        // Problem: when component first renders, useEffect will run, changing the playerTurn
        setPlayerTurn(!playerTurn);
      }
    } else {
      didMount.current = true;
    }
  }, [gridValues]);

  const inputSymbol = (index: number) => (event: any) => {
    // Boxes shouldn't be clicked more than once
    if (gridValues[index] !== "") {
      return;
    }

    let mark: string;
    mark = playerTurn ? "X" : "O";

    const temporaryArray: string[] = [...gridValues];
    temporaryArray[index] = mark;
    setGridValues(temporaryArray);
  };

  return (
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
  );
}
