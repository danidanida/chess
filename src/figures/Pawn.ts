import { IFigure } from "./Figure"
import { isFigureOn, getFigure } from "./Figures"

export class Pawn implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "pawn"
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string

    canMove(targetI: number, targetJ: number): boolean | undefined {
        const cellHasFigure = isFigureOn(targetI, targetJ)
        if (cellHasFigure) {
            const figure = getFigure(targetI, targetJ)
            if (figure.color === this.color) {
                return false
            }
        }
        if (this.color) {
            // white pawn logic
            const figure = getFigure(targetI, targetJ)
            if (
                (figure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ + 1) ||
                (figure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ - 1) ||
                (!cellHasFigure && this.coordinateI - 1 === targetI && this.coordinateJ === targetJ)
            ) {
                return true
            }
            if (this.coordinateI - 2 === targetI && this.coordinateJ === targetJ && this.coordinateI === 6) {
                return true
            }
        } else {
            // black pawn logic
            const figure = getFigure(targetI, targetJ)
            if (
                (figure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ + 1) ||
                (figure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ - 1) ||
                (!cellHasFigure && this.coordinateI + 1 === targetI && this.coordinateJ === targetJ)
            ) {
                return true
            }
            if (this.coordinateI + 2 === targetI && this.coordinateJ === targetJ && this.coordinateI === 1) {
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
