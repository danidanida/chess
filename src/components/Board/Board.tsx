import './Board.css';
import { useState } from 'react';
import Cell from '../Cell/Cell';
import { Pawn, King, Bishop, Knight, Rook, Queen } from '../../figures/Figure';

const Board = () => {

    const figures = [
        new Pawn(true, 6, 0),
        new Pawn(true, 6, 1),
        new Pawn(true, 6, 2),
        new Pawn(true, 6, 3),
        new Pawn(true, 6, 4),
        new Pawn(true, 6, 5),
        new Pawn(true, 6, 6),
        new Pawn(true, 6, 7),

        new Pawn(false, 1, 0),
        new Pawn(false, 1, 1),
        new Pawn(false, 1, 2),
        new Pawn(false, 1, 3),
        new Pawn(false, 1, 4),
        new Pawn(false, 1, 5),
        new Pawn(false, 1, 6),
        new Pawn(false, 1, 7),

        new Knight(false, 0, 1),
        new Knight(false, 0, 6),

        new Knight(true, 7, 1),
        new Knight(true, 7, 6),

        new Rook(true, 7, 0),
        new Rook(true, 7, 7),

        new Rook(false, 0, 0),
        new Rook(false, 0, 7),

        new Queen(true, 7, 3),
        new Queen(false, 0, 3),

        new King(true, 7, 4),
        new King(false, 0, 4),

        new Bishop(true, 7, 2),
        new Bishop(true, 7, 5),

        new Bishop(false, 0, 2),
        new Bishop(false, 0, 5)
    ]


    const [isSelected, setSelected] = useState<SelectedCoordinates>({
        i: '',
        j: ''
    });

    const handleClick = (i: number, j: number) => {
        const current = { i, j }
        setSelected({ i: i, j: j })
        if (isSelected.i === current.i && isSelected.j === current.j) { setSelected({ i: '', j: '' }) }
    }
    const initializeChessBoard = () => {
        let chessBoard = []
        for (let i = 0; i < 8; i++) {
            let rows = []
            for (let j = 0; j < 8; j++) {
                const isBlack = ((i + j) % 2) === 0
                let isSelectedCell = (i === isSelected.i && j === isSelected.j)
                let filteredArray = figures.filter(f => f.coordinateI === i && f.coordinateJ === j)
                let currentFigure = filteredArray[0]
                rows.push(<th key={(i + j).toString()}><Cell figure={currentFigure} selected={isSelectedCell} handleClick={handleClick} color={isBlack} i={i} j={j} /></th>)
            }
            chessBoard.push(<tr key={(i).toString()}>{rows}</tr>)
        }
        return chessBoard

    }
    return (
        <div className="App">
            <div className="chessboard">
                <table >
                    <thead></thead>
                    <tbody>
                        {initializeChessBoard()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Board;

interface SelectedCoordinates {
    i: number | string,
    j: number | string
}