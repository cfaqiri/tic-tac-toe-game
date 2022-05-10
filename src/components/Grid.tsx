import { useState, useEffect } from "react";
import classes from "./Grid.module.css";

export default function Grid() {
  const defaultGridValues = [...Array(9).fill("")];

  const [playerTurn, setPlayerTurn] = useState(true);
  const [gridValues, setGridValues] = useState(defaultGridValues);

  useEffect(() => {
    if (hasWon()) {
      alert('Winner!');
    }
  }, [gridValues])

  const hasWon = (): boolean => {
    // Alert players when someone wins - work in progress
    if (
      gridValues[0] !== "" &&
      gridValues[0] === gridValues[1] &&
      gridValues[1] === gridValues[2]
    ) {
      return true
    }
    return false
  };

  const printHello = (index: number) => (event: any) => {
    if (gridValues[index] !== "") {
      return;
    }

    let mark: string;
    mark = playerTurn ? "X" : "O";

    const temporaryArray: string[] = [...gridValues];
    temporaryArray[index] = mark;
    setGridValues(temporaryArray);
    setPlayerTurn(!playerTurn);
  };

  return (
    <div className={classes.gameboard}>
      {gridValues.map((value, index) => (
        <div
          key={"box-" + index}
          className={classes.box}
          onClick={printHello(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
