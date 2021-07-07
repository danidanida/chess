import './Board.css';
import { useState } from 'react';
import Cell from '../Cell/Cell';

const Board = () => {


    const figures = [
        { i: 6, j: 0, type: "pawn", color: 'white', },
        { i: 6, j: 1, type: "pawn", color: 'white', },
        { i: 6, j: 2, type: "pawn", color: 'white', },
        { i: 6, j: 3, type: "pawn", color: 'white', },
        { i: 6, j: 4, type: "pawn", color: 'white', },
        { i: 6, j: 5, type: "pawn", color: 'white', },
        { i: 6, j: 6, type: "pawn", color: 'white', },
        { i: 6, j: 7, type: "pawn", color: 'white', },

        { i: 1, j: 0, type: "pawn", color: 'black' },
        { i: 1, j: 1, type: "pawn", color: 'black' },
        { i: 1, j: 2, type: "pawn", color: 'black' },
        { i: 1, j: 3, type: "pawn", color: 'black' },
        { i: 1, j: 4, type: "pawn", color: 'black' },
        { i: 1, j: 5, type: "pawn", color: 'black' },
        { i: 1, j: 6, type: "pawn", color: 'black' },
        { i: 1, j: 7, type: "pawn", color: 'black' },

        { i: 7, j: 1, type: "knight", color: 'white' },
        { i: 7, j: 6, type: "knight", color: 'white' },

        { i: 0, j: 1, type: "knight", color: 'black' },
        { i: 0, j: 6, type: "knight", color: 'black' },

        { i: 7, j: 0, type: "rook", color: "white" },
        { i: 7, j: 7, type: "rook", color: "white" },

        { i: 0, j: 0, type: "rook", color: "black" },
        { i: 0, j: 7, type: "rook", color: "black" },

        { i: 7, j: 3, type: "queen", color: "white" },
        { i: 0, j: 3, type: "queen", color: "black" },

        { i: 7, j: 4, type: "king", color: "white" },
        { i: 0, j: 4, type: "king", color: "black" },

        { i: 7, j: 2, type: "bishop", color: "white" },
        { i: 7, j: 5, type: "bishop", color: "white" },

        { i: 0, j: 2, type: "bishop", color: "black" },
        { i: 0, j: 5, type: "bishop", color: "black" }
    ];

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
                let filteredArray = figures.filter(f => f.i === i && f.j === j)
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