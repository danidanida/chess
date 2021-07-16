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
        for (let i = 0; i < 7; i++) {
            const cellHasFigure = isFigureOn(targetI, targetJ)

            if (this.coordinateI - i === targetI && this.coordinateJ + i === targetJ) {
                for (let j = this.coordinateJ + 1; j <= targetJ - 1; j++) {
                    for (let i = this.coordinateI - 1; i >= targetI + 1; i--) {
                        if (isFigureOn(i, j)) {
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

            if (this.coordinateI + i === targetI && this.coordinateJ - i === targetJ) {
                for (let j = this.coordinateJ - 1; j >= targetJ + 1; j--) {
                    for (let i = this.coordinateI + 1; i <= targetI - 1; i++) {
                        if (isFigureOn(i, j)) {
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
            if (this.coordinateI + i === targetI && this.coordinateJ + i === targetJ) {
                for (let j = this.coordinateJ + 1; j <= targetJ - 1; j++) {
                    for (let i = this.coordinateI + 1; i <= targetI - 1; i++) {
                        if (isFigureOn(i, j)) {
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
            if (this.coordinateI - i === targetI && this.coordinateJ - i === targetJ) {
                for (let j = this.coordinateJ - 1; j >= targetJ + 1; j--) {
                    for (let i = this.coordinateI - 1; i >= targetI + 1; i--) {
                        if (isFigureOn(i, j)) {
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
