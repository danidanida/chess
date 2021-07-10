import "./Board.css";
import { useState } from "react";
import Cell from "../Cell/Cell";
import { figures } from "../../figures/Figures";

const Board = () => {
  const [isSelected, setSelected] = useState<SelectedCoordinates>({
    i: "",
    j: "",
  });

  const handleClick = (i: number, j: number) => {
    const current = { i, j };
    setSelected({ i: i, j: j });
    if (isSelected.i === current.i && isSelected.j === current.j) {
      setSelected({ i: "", j: "" });
    }
  };
  
  const initializeChessBoard = () => {
    let chessBoard = [];
    const selectedFigure = figures.filter(
      (f) => f.coordinateI === isSelected.i && f.coordinateJ === isSelected.j
    )[0];

    for (let i = 0; i < 8; i++) {
      let rows = [];
      for (let j = 0; j < 8; j++) {

        const isBlack = (i + j) % 2 === 0;
        const isSelectedCell = i === isSelected.i && j === isSelected.j;
        const currentFigure = figures.filter(
          (f) => f.coordinateI === i && f.coordinateJ === j
        )[0];
        const isSuggestion = selectedFigure && selectedFigure.canMove(i, j);

        rows.push(
          <th key={(i + j).toString()}>
            <Cell
              figure={currentFigure}
              selected={isSelectedCell}
              handleClick={handleClick}
              color={isBlack}
              moveSuggestion={isSuggestion}
              i={i}
              j={j}
            />
          </th>
        );
      }
      chessBoard.push(<tr key={i.toString()}>{rows}</tr>);
    }
    return chessBoard;
  };
  return (
      <div className="chessboard">
          <h1 className="chessboard_title"> Chess</h1>
        <table>
          <thead>
          </thead>
          <tbody>{initializeChessBoard()}</tbody>
        </table>
      </div>
  );
};

export default Board;

interface SelectedCoordinates {
  i: number | string;
  j: number | string;
}
