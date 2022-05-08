import { useState } from "react";
import classes from "./Grid.module.css";

export default function Grid() {
  const defaultGridValues = [...Array(9).fill("")];

  const [playerTurn, setPlayerTurn] = useState(true);
  const [gridValues, setGridValues] = useState(defaultGridValues);

  const hasWon = (gridValues: string[]): void => {
    // Alert players when someone wins - work in progress
    if (
      gridValues[0] !== "" &&
      gridValues[0] === gridValues[1] &&
      gridValues[1] === gridValues[2]
    ) {
      alert("you won!");
    }
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
    hasWon(gridValues);
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
