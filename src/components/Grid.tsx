import { useState, useEffect, useRef } from "react";
import classes from "./Grid.module.css";

export default function Grid() {
  const defaultGridValues = [...Array(9).fill("")];

  const playerTurn = useRef(true);
  const [gridValues, setGridValues] = useState(defaultGridValues);

  useEffect(() => {

    // Looks like when we want to use a function inside useEffect we have to define it
    // inside useEffect.
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

    if (hasWon()) {
      const winner: 1|2 = playerTurn.current ?  1 : 2;
      alert(`Winner: Player ${winner}!`);
    } else {
      // Problem: when component first renders, useEffect will run, changing the playerTurn
      // Solution: instead of using useState we have to use useRef because we don't want this
      // value to render the page.
      playerTurn.current = !playerTurn.current;
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
