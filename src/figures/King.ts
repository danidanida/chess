import { IFigure } from "./Figure"
import { isFigureOn, getFigure } from "./Figures"

export class King implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "king"
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
            // white king logic
            if (
                (this.coordinateI - 1 === targetI ||
                    this.coordinateI === targetI ||
                    this.coordinateI + 1 === targetI) &&
                (this.coordinateJ === targetJ || this.coordinateJ - 1 === targetJ || this.coordinateJ + 1 === targetJ)
            ) {
                return true
            }
        } else {
            // black king logic
            if (
                (this.coordinateI + 1 === targetI ||
                    this.coordinateI === targetI ||
                    this.coordinateI - 1 === targetI) &&
                (this.coordinateJ === targetJ || this.coordinateJ + 1 === targetJ || this.coordinateJ - 1 === targetJ)
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
        //this.coordinateI = -1
        //this.coordinateJ = -1
    }
}
