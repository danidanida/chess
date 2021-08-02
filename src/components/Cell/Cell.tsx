import "./Cell.css"
import React from "react"
import bK from "../../images/bK.png"
import wK from "../../images/wK.png"
import wQ from "../../images/wQ.png"
import bQ from "../../images/bQ.png"
import wB from "../../images/wB.png"
import bB from "../../images/bB.png"
import wR from "../../images/wR.png"
import bR from "../../images/bR.png"
import wP from "../../images/wP.png"
import bP from "../../images/bP.png"
import wN from "../../images/wN.png"
import bN from "../../images/bN.png"

const Cell: React.FC<Props> = ({
    color,
    i,
    j,
    handleClick,
    selected,
    figure,
    moveSuggestion,
    gameIsOver,
    highlighted,
}) => {
    function handleChange(e: any): void {
        e.preventDefault()
        if (!gameIsOver) {
            handleClick(i, j)
        }
    }

    function getFigureImage(type: string, color: boolean) {
        switch (type) {
            case "king":
                return color ? wK : bK
            case "queen":
                return color ? wQ : bQ
            case "bishop":
                return color ? wB : bB
            case "rook":
                return color ? wR : bR
            case "pawn":
                return color ? wP : bP
            case "knight":
                return color ? wN : bN
        }
    }

    return (
        <div
            onClick={handleChange}
            style={
                selected
                    ? { backgroundColor: "rgba(246, 244, 186, 0.5)" }
                    : figure && highlighted
                    ? { backgroundColor: "rgba(243, 1, 1, 0.5)" }
                    : undefined
            }
            className={color ? "cell cell_white" : "cell cell_black"}
        >
            {figure && (
                <img className="chess_figure_image" src={getFigureImage(figure.type, figure.color)} alt={figure.type}></img>
            )}
            {moveSuggestion && <div className="chess_move_suggestion"></div>}
        </div>
    )
}

interface Figure {
    type: string
    color: boolean
    coordinateI: number
    coordinateJ: number
}
interface Props {
    color: boolean
    i: number
    j: number
    handleClick: (i: number, j: number) => void
    selected: boolean
    figure: Figure
    moveSuggestion: boolean | undefined
    gameIsOver: boolean
    highlighted: boolean
}

export default Cell
