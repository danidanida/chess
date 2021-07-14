import { IFigure } from "./Figure"

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

    canMove(targetI: number, targetJ: number): boolean {
        if (this.color) {
            // white pawn logic
            if (
                (this.coordinateI - 1 === targetI && this.coordinateJ === targetJ) ||
                (this.coordinateI - 2 === targetI && this.coordinateJ === targetJ && this.coordinateI === 6)
            ) {
                return true
            } else return false
        } else {
            // black pawn logic
            if (
                (this.coordinateI + 1 === targetI && this.coordinateJ === targetJ) ||
                (this.coordinateI + 2 === targetI && this.coordinateJ === targetJ && this.coordinateI === 1)
            ) {
                return true
            } else return false
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
