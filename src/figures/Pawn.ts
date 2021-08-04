import { ChessBoard } from "./Chessboard"
import { IFigure } from "./Figure"

export class Pawn implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "pawn"
        this.promotion = false
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string
    promotion: boolean

    canMove(targetI: number, targetJ: number, chessboard: ChessBoard): boolean | undefined {
        const cellHasFigure = chessboard.isFigureOn(targetI, targetJ)
        if (cellHasFigure) {
            const figure = chessboard.getFigure(targetI, targetJ)
            if (figure.color === this.color) {
                return false
            }
            if (figure.color !== this.color && Math.abs(figure.coordinateI - this.coordinateI) === 2) {
                return false
            }
        }
        if (this.color) {
            // white pawn logic
            if (this.coordinateI === 0) {
                // promotion
                this.promotion = true
            }
            const figure = chessboard.getFigure(targetI, targetJ)
            if (
                (figure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ + 1) ||
                (figure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ - 1) ||
                (!cellHasFigure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ)
            ) {
                return true
            }
            if (
                !chessboard.isFigureOn(this.coordinateI - 1, this.coordinateJ) &&
                this.coordinateI - 2 === targetI &&
                this.coordinateJ === targetJ &&
                this.coordinateI === 6
            ) {
                return true
            }
        } else {
            // black pawn logic
            if (this.coordinateI === 7) {
                //promotion
                this.promotion = true
            }
            const figure = chessboard.getFigure(targetI, targetJ)
            if (
                (figure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ + 1) ||
                (figure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ - 1) ||
                (!cellHasFigure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ)
            ) {
                return true
            }
            if (
                !chessboard.isFigureOn(this.coordinateI + 1, this.coordinateJ) &&
                this.coordinateI + 2 === targetI &&
                this.coordinateJ === targetJ &&
                this.coordinateI === 1
            ) {
                return true
            }
        }
    }

    move(targetI: number, targetJ: number): void {
        this.coordinateI = targetI
        this.coordinateJ = targetJ
    }

    die() {
        this.coordinateI = -1
        this.coordinateJ = -1
    }
}
