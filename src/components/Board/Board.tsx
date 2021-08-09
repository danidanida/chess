import "./Board.css"
import { useState } from "react"
import { ChessBoard } from "../../figures/Chessboard"
import Cell from "../Cell/Cell"

const Board = () => {
    const [render, setRender] = useState(0)
    const [chessboard, setChessboard] = useState<ChessBoard>(() => new ChessBoard())

    function handleStartNewGameClick() {
        setChessboard(() => new ChessBoard())
    }

    const handleSelectChange = (event: any) => {
        chessboard.promotion = false
        chessboard.promoteFigure(event.currentTarget.value)
    }

    const handleBack = () => {
        chessboard.moveBack()
        setRender(render + 1)
    }

    const handleCellClick = (i: number, j: number): void => {
        const current = { i, j }
        if (chessboard.promotion) {
            return
        }
        if (chessboard.checkMate) {
            alert("checkmate")
            return
        }
        if (!chessboard.areCoordinatesSelected()) {
            chessboard.select(i, j)
        } else {
            chessboard.makeMove(i, j)
            if (chessboard.checkIfKingUnderAttack(!chessboard.turn)) {
                chessboard.check = true
            } else chessboard.check = false
            if (chessboard.checkIfKingUnderCheckMate(chessboard.turn)) {
                chessboard.checkMate = true
            }
            if (chessboard.selectedI === current.i && chessboard.selectedJ === current.j) {
                chessboard.deselect()
            }
        }
        setRender(render + 1)
    }

    const drawChessBoard = () => {
        let chessBoard = []

        const selectedFigure = chessboard.getSelectedFigure()

        for (let i = 0; i < 8; i++) {
            let rows = []
            for (let j = 0; j < 8; j++) {
                const isBlack = (i + j) % 2 === 0
                const isSelectedCell = i === chessboard.selectedI && j === chessboard.selectedJ
                const currentFigure = chessboard.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
                const isSuggestion = selectedFigure && selectedFigure.canMove(i, j, chessboard)
                const highlight =
                    chessboard.check &&
                    currentFigure &&
                    currentFigure.type === "king" &&
                    currentFigure.color === chessboard.turn
                rows.push(
                    <th key={(i + j).toString()}>
                        <Cell
                            figure={currentFigure}
                            selected={isSelectedCell}
                            handleClick={handleCellClick}
                            color={isBlack}
                            moveSuggestion={isSuggestion}
                            i={i}
                            j={j}
                            highlighted={highlight}
                        />
                    </th>
                )
            }
            chessBoard.push(<tr key={i.toString()}>{rows}</tr>)
        }
        return chessBoard
    }
    return (
        <div className="chessboard">
            {chessboard.promotion && (
                <div>
                    <select className="chess_promotion" onChange={handleSelectChange}>
                        <option selected>Choose a figure</option>
                        <option value="queen">Queen</option>
                        <option value="bishop">Bishop</option>
                        <option value="rook">Rook</option>
                        <option value="knight">Knight</option>
                    </select>
                </div>
            )}
            <table>
                <thead></thead>
                <tbody>{drawChessBoard()}</tbody>
            </table>
            <button className="chess_reset_game_btn" onClick={handleStartNewGameClick}>
                New Game
            </button>
            <button className="chess_reset_game_btn" onClick={handleBack}>
                Back
            </button>
        </div>
    )
}

export default Board
