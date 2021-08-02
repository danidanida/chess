import { Pawn } from "./Pawn"
import { King } from "./King"
import { Queen } from "./Queen"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Knight } from "./Knight"
import { IFigure } from "./Figure"

export class ChessBoard {
    constructor() {
        this.figures = [
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
    }
    figures: Array<IFigure>

    isFigureOn = (i: number, j: number): boolean => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j).length > 0
    }

    getFigure = (i: number, j: number): IFigure => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
    }

    getDeadWhiteFiguresAmount = () => {
        return this.figures.filter((f) => f.color && f.coordinateI === -1 && f.coordinateJ === -1).length
    }

    getDeadBlackFiguresAmount = () => {
        return this.figures.filter((f) => !f.color && f.coordinateI === -1 && f.coordinateJ === -1).length
    }

    promoteFigure = (type: string) => {
        const pawn = this.figures
            .filter((f) => f.type === "pawn")
            .map((f) => f as Pawn)
            .find((f) => f.promotion)
        if (pawn) {
            switch (type) {
                case "bishop":
                    this.figures.push(new Bishop(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "queen":
                    this.figures.push(new Queen(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "knight":
                    this.figures.push(new Knight(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "rook":
                    this.figures.push(new Rook(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
            }

            pawn.move(-2, -2)
            pawn.promotion = false
        }
    }

    checkIfCellIsUnderAttack(color: boolean, i: number, j: number) {
        return this.figures.some((f) => f.type !== "king" && f.color !== color && f.canMove(i, j, this))
    }

    checkIfBlackKingUnderAttack(): boolean {
        const blackKing = this.figures.filter((f) => f.type === "king" && !f.color)[0]
        if (this.figures.some((f) => f.color && f.canMove(blackKing.coordinateI, blackKing.coordinateJ, this))) {
            return true
        }
        return false
    }

    checkIfWhiteKingUnderAttack(): boolean {
        const whiteKing = this.figures.filter((f) => f.type === "king" && f.color)[0]
        if (this.figures.some((f) => !f.color && f.canMove(whiteKing.coordinateI, whiteKing.coordinateJ, this))) {
            return true
        }
        return false
    }

    checkIfWhiteKingUnderCheckMate(): boolean {
        const whiteKing = this.figures.filter((f) => f.type === "king" && f.color)[0]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (whiteKing.canMove(i, j, this)) {
                    if (this.figures.some((f) => !f.color && f.canMove(i, j, this))) {
                        return true
                    }
                }
            }
        }
        return false
    }
}
