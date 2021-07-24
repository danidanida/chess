import "./Cell.css"
import React from "react"

const Cell: React.FC<Props> = ({ color, i, j, handleClick, selected, figure, moveSuggestion, gameIsOver }) => {
    function handleChange(e: any): void {
        e.preventDefault()
        if (!gameIsOver) {handleClick(i, j)}
    }

    function capitilizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div
            onClick={handleChange}
            style={
                selected
                    ? { backgroundColor: "rgba(246, 244, 186, 0.5)" }
                    : moveSuggestion
                    ? { border: "2.5px dashed red" }
                    : undefined
            }
            className={color ? "cell cell_white" : "cell cell_black"}
            // for debugging purpose 
        >   {/*<span style={{color:"blue"}}>i:{i} j:{j}</span>*/} 
            {figure && (
                <p className="figure_name" style={figure.color ? { color: "white" } : { color: "black" }}>
                    {capitilizeFirstLetter(figure.type)} 
                </p>
                
            )}
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
}

export default Cell
