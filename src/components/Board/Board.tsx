import "./Board.css"
import { useState } from "react"
import Cell from "../Cell/Cell"
import {
    figures,
    isFigureOn,
    getFigure,
    getDeadWhiteFiguresAmount,
    getDeadBlackFiguresAmount,
    promoteFigure,
} from "../../figures/Figures"
import { IFigure } from "../../figures/Figure"

const Board = () => {
    const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates>({
        i: undefined,
        j: undefined,
    })

    const [turn, setTurn] = useState<boolean>(true)
    const [isPromotionMode, setPromotionMode] = useState<boolean>(false)
    const [checkMate, setCheckMate] = useState<boolean>(false)

    function handleNewGameClick() {
        window.location.reload()
    }
    const deadWhiteFiguresAmount = getDeadWhiteFiguresAmount()
    const deadBlackFiguresAmount = getDeadBlackFiguresAmount()

    const areCoordinatesSelected = (): boolean =>
        selectedCoordinates.i !== undefined && selectedCoordinates.j !== undefined

    const getSelectedFigure = (): IFigure =>
        figures.filter((f) => f.coordinateI === selectedCoordinates.i && f.coordinateJ === selectedCoordinates.j)[0]

    const deselect = (): void => setSelectedCoordinates({ i: undefined, j: undefined })
    const stayAtPosition = (): void => setSelectedCoordinates({ i: selectedCoordinates.i, j: selectedCoordinates.j })

    const handleSelectChange = (event: any) => {
        setPromotionMode(false)
        promoteFigure(event.currentTarget.value)
    }

    const handleClick = (i: number, j: number): void => {
        if (isPromotionMode) {
            return
        }

        const current = { i, j }
        if (!areCoordinatesSelected()) {
            // if nothingis chosen
            const selectedFigure = getFigure(i, j)
            if (selectedFigure && selectedFigure.color === turn) {
                setSelectedCoordinates({ i: i, j: j })
            }
        } else {
            // if smth is chosen
            const selectedFigure = getSelectedFigure()

            // white turn
            if (turn && selectedFigure && selectedFigure.color && selectedFigure.canMove(i, j)) {
                if (isFigureOn(i, j)) {
                    const deadFigure = getFigure(i, j)
                    !deadFigure.color ? deadFigure.die() : stayAtPosition()
                    deadFigure.type === "king" ? setCheckMate(true) : deadFigure.die()
                }
                selectedFigure.move(i, j)
                setTurn(false)
                deselect()
                // black turn
            } else if (!turn && !selectedFigure.color && selectedFigure.canMove(i, j)) {
                if (isFigureOn(i, j)) {
                    const deadFigure = getFigure(i, j)
                    deadFigure.type === "king" ? setCheckMate(true) : deadFigure.die()
                }
                selectedFigure.move(i, j)
                setTurn(true)
                deselect()
            } else {
                deselect()
            }

            if (selectedFigure.type === "pawn" && selectedFigure.promotion) {
                setPromotionMode(true)
            }
        }
        if (selectedCoordinates.i === current.i && selectedCoordinates.j === current.j) {
            deselect()
        }
    }

    const drawChessBoard = () => {
        let chessBoard = []

        const selectedFigure = getSelectedFigure()

        for (let i = 0; i < 8; i++) {
            let rows = []
            for (let j = 0; j < 8; j++) {
                const isBlack = (i + j) % 2 === 0
                const isSelectedCell = i === selectedCoordinates.i && j === selectedCoordinates.j
                const currentFigure = figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
                const isSuggestion = selectedFigure && selectedFigure.canMove(i, j)

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
                            gameIsOver={checkMate}
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
            <button onClick={handleNewGameClick}>New Game</button>
            {isPromotionMode && (
                <div className="chess_promotion">
                    <select onChange={handleSelectChange} aria-label="Default select example">
                        <option selected>Choose a figure</option>
                        <option value="queen">Queen</option>
                        <option value="bishop">Bishop</option>
                        <option value="rook">Rook</option>
                        <option value="knight">Knight</option>
                    </select>
                </div>
            )}
            <h3 className="chessboard_announcement" style={turn ? { color: "white" } : { color: "black" }}>
                {!checkMate && (turn ? "White turn" : "Black turn")}
                {checkMate && "Game is over"}
            </h3>
            <h3>
                Killed white figures {deadWhiteFiguresAmount} and killed black figures {deadBlackFiguresAmount}
            </h3>
            <table>
                <thead></thead>
                <tbody>{drawChessBoard()}</tbody>
            </table>
        </div>
    )
}

export default Board

interface Coordinates {
    i: number | undefined
    j: number | undefined
}
