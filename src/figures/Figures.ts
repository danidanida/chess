import { Pawn } from "./Pawn"
import { King } from "./King"
import { Queen } from "./Queen"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Knight } from "./Knight"
import { IFigure } from "./Figure"

export const figures = [
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
    new Bishop(false, 0, 5),
]

// for debugging
/*export const figures = [
    new Rook(true, 3, 3),

   // new Pawn(false, 6, 6),
   // new Pawn(false, 1, 5),
   // new Pawn(false, 1, 1),
  //  new Pawn(true, 0, 0),
   // new Pawn(true, 7, 7),
   // new Pawn(true, 6, 0),
   // new Pawn(false, 5, 1),
  //  new Pawn(true, 0, 6),

    //new Pawn(false, 3, 3),
    new Pawn(true, 7, 7),
    new Pawn(false, 0, 3),
    new Pawn(true, 6, 0),
    new Pawn(true, 0, 6),
    new Pawn(true, 7, 4),
   // new Pawn(false, 3, 1),
   // new Pawn(false, 3, 6),
]*/

export const isFigureOn = (i: number, j: number): boolean => {
    return figures.filter((f) => f.coordinateI === i && f.coordinateJ === j).length > 0
}

export const getFigure = (i: number, j: number): IFigure => {
    return figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
}

export const getDeadWhiteFiguresAmount = () => {
    return figures.filter((f) => f.color && f.coordinateI === -1 && f.coordinateJ === -1).length
}

export const getDeadBlackFiguresAmount = () => {
    return figures.filter((f) => !f.color && f.coordinateI === -1 && f.coordinateJ === -1).length
}

export const promoteFigure = (type: string) => {
    const pawn = figures
        .filter((f) => f.type === "pawn")
        .map((f) => f as Pawn)
        .find((f) => f.promotion)
    if (pawn) {
        switch (type) {
            case "bishop":
                figures.push(new Bishop(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                break
            case "queen":
                figures.push(new Queen(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                break
            case "knight":
                figures.push(new Knight(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                break
            case "rook":
                figures.push(new Rook(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                break
        }

        pawn.move(-2, -2)
        pawn.promotion = false
    }
}

export function checkIfCellIsUnderAttack(color: boolean, i: number, j: number) {
    return figures.some((f) => f.type !== "king" && f.color !== color && f.canMove(i, j))
}

export function checkIfBlackKingUnderAttack() {
    const blackKing = figures.filter((f) => f.type === "king" && !f.color)[0]
    if (figures.some((f) => f.color && f.canMove(blackKing.coordinateI, blackKing.coordinateJ))) {
        return true
    }
}

export function checkIfWhiteKingUnderAttack() {
    const whiteKing = figures.filter((f) => f.type === "king" && f.color)[0]
    if (figures.some((f) => !f.color && f.canMove(whiteKing.coordinateI, whiteKing.coordinateJ))) {
        return true
    }
}
