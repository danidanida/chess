import { IFigure } from "./Figure"
import { isFigureOn, getFigure } from "./Figures"

export class Bishop implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "bishop"
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string

    canMove(targetI: number, targetJ: number): boolean | undefined {
        // is on same diagonal
        const figure = getFigure(targetI, targetJ)
        const diffI = targetI - this.coordinateI
        const diffJ = targetJ - this.coordinateJ
        if (Math.abs(diffI) !== Math.abs(diffJ)) {
            return false
        }
        if (figure && figure.color === this.color) {
            return false
        }

        if (diffI > 0 && diffJ > 0) {
            for (let c = 1; c < diffI; c++) {
                if (isFigureOn(this.coordinateI + c, this.coordinateJ + c)) {
                    return false
                }
            }
            return true
        }

        if (diffI < 0 && diffJ > 0) {
            for (let c = 1; c < diffJ; c++) {
                if (isFigureOn(this.coordinateI - c, this.coordinateJ + c)) {
                    return false
                }
            }
            return true
        }

        if (diffI < 0 && diffJ < 0) {
            for (let c = 1; c < Math.abs(diffI); c++) {
                if (isFigureOn(this.coordinateI - c, this.coordinateJ - c)) {
                    return false
                }
            }
            return true
        }

        if (diffI > 0 && diffJ < 0) {
            for (let c = 1; c < diffI; c++) {
                if (isFigureOn(this.coordinateI + c, this.coordinateJ - c)) {
                    return false
                }
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
