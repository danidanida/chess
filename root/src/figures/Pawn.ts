import { IFigure } from "./Figure"
//import { figures } from "./Figures"
//import { Queen } from "./Queen"
import { isFigureOn, getFigure } from "./Figures"

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
            if (this.coordinateI === 1 && !isFigureOn(0, this.coordinateJ - 1)) {
                // promotion
                this.promotion = true
            }
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
            if (this.coordinateI === 6 && !isFigureOn(7, this.coordinateJ + 1)) {
                //promotion
                this.promotion = true
            }
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
