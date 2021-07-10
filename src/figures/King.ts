import { IFigure } from "./Figure"

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
}
