import './Cell.css';
import React from 'react';

const Cell: React.FC<Props> = ({ color, i, j, handleClick, selected, figure }) => {
    function handleChange(e: any) {
        e.preventDefault()
        handleClick(i, j)
    }

    return (
        <div onClick={handleChange} style={selected ? { backgroundColor: '#FFFFE0' } : undefined} className={color ? "cell cell_white" : "cell cell_black"}>
            {figure && <p className="figure_name" style={figure.color? {color:"white"}:{color:"black"}}> {figure.type} </p>}
        </div>
    );
};

interface Figure {
    type: string,
    color: boolean,
    coordinateI: number,
    coordinateJ: number
}
interface Props {
   color: boolean,
   i: number,
   j: number,
   handleClick: (i: number, j: number) => void,
   selected: boolean,
   figure: Figure
}

export default Cell;
