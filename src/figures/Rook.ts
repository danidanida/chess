import { IFigure } from "./Figure"
import { isFigureOn, getFigure } from "./Figures"

export class Rook implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "rook"
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string

    canMove(targetI: number, targetJ: number): boolean | undefined {

        const cellHasFigure = isFigureOn(targetI, targetJ)

        if (this.coordinateI === targetI) {
            if (targetJ > this.coordinateJ) {
                for (let j = this.coordinateJ + 1; j <= targetJ - 1; j++) {
                    if (isFigureOn(this.coordinateI, j)) {
                        return false
                    }
                }
            } else {
                for (let j = this.coordinateJ - 1; j >= targetJ + 1; j--) {
                    if (isFigureOn(this.coordinateI, j)) {
                        return false
                    }
                }
            }
            if (cellHasFigure) {
                const figure = getFigure(targetI, targetJ)
                if (figure.color === this.color) {
                    return false
                }
                return true
            }

            return true
        }

        if (this.coordinateJ === targetJ) {
            if (targetI > this.coordinateI) {
                for (let i = this.coordinateI + 1; i <= targetI - 1; i++) {
                    if (isFigureOn(i, this.coordinateJ)) {
                        return false
                    }
                }
            } else {
                for (let i = this.coordinateI - 1; i >= targetI + 1; i--) {
                    if (isFigureOn(i, this.coordinateJ)) {
                        return false
                    }
                }
            }
            if (cellHasFigure) {
                const figure = getFigure(targetI, targetJ)
                if (figure.color === this.color) {
                    return false
                }
                return true
            }
            return true
        }
        return false
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
