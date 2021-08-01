import { IFigure } from "./Figure"
import {
    isFigureOn,
    getFigure,
    checkIfCellIsUnderAttack
} from "./Figures"

export class King implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "king"
        this.didMove = false
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string
    didMove: boolean

    canMove(targetI: number, targetJ: number): boolean | undefined {
        const cellHasFigure = isFigureOn(targetI, targetJ)

        if (cellHasFigure) {
            const figure = getFigure(targetI, targetJ)
            if (figure.color === this.color) {
                return false
            }
        }
        if (checkIfCellIsUnderAttack(this.color, targetI, targetJ) ) {
            return false
        }
        // castling
        if (this.didMove === false) {
            const rookRight = getFigure(this.coordinateI, this.coordinateJ + 3)
            const rookLeft = getFigure(this.coordinateI, this.coordinateJ - 4)
            if (
                rookRight &&
                rookRight.type === "rook" &&
                !rookRight.didMove &&
                !isFigureOn(this.coordinateI, this.coordinateJ + 1) &&
                !isFigureOn(this.coordinateI, this.coordinateJ + 2) &&
                targetI === this.coordinateI &&
                targetJ === this.coordinateJ + 2
            ) {
                return true
            }
            if (
                rookLeft &&
                rookRight.type === "rook" &&
                !rookRight.didMove &&
                !isFigureOn(this.coordinateI, this.coordinateJ - 1) &&
                !isFigureOn(this.coordinateI, this.coordinateJ - 2) &&
                !isFigureOn(this.coordinateI, this.coordinateJ - 3) &&
                targetI === this.coordinateI &&
                targetJ === this.coordinateJ - 2
            ) {
                return true
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
        this.didMove = true
        //castling
        if (targetJ === this.coordinateJ + 2) {
            const rook = getFigure(this.coordinateI, this.coordinateJ + 3)
            rook.move(this.coordinateI, this.coordinateJ + 1)
        }
        if (targetJ === this.coordinateJ - 2) {
            const rook = getFigure(this.coordinateI, this.coordinateJ - 4)
            rook.move(this.coordinateI, this.coordinateJ - 1)
        }
        this.coordinateI = targetI
        this.coordinateJ = targetJ
    }

    die() {
        this.coordinateI = -1
        this.coordinateJ = -1
    }
}
