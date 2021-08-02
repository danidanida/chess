import { ChessBoard} from "./Chessboard"
import { IFigure } from "./Figure"

export class Rook implements IFigure {
    constructor(color: boolean, coordinateI: number, coordinateJ: number) {
        this.color = color
        this.coordinateI = coordinateI
        this.coordinateJ = coordinateJ
        this.type = "rook"
        this.didMove = false
    }
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string
    didMove: boolean

    canMove(targetI: number, targetJ: number, chessboard: ChessBoard): boolean | undefined {
        const figure = chessboard.getFigure(targetI, targetJ)
        const diffI = targetI - this.coordinateI
        const diffJ = targetJ - this.coordinateJ
        if (Math.abs(diffI) !== Math.abs(diffJ)) {
            if (figure && figure.color === this.color) {
                return false
            }
            if (diffI === 0 && diffJ > 0) {
                for (let c = 1; c < diffJ; c++) {
                    if (chessboard.isFigureOn(this.coordinateI, this.coordinateJ + c)) {
                        return false
                    }
                }
                return true
            }

            if (diffI === 0 && diffJ < 0) {
                for (let c = 1; c < Math.abs(diffJ); c++) {
                    if (chessboard.isFigureOn(this.coordinateI, this.coordinateJ - c)) {
                        return false
                    }
                }
                return true
            }

            if (diffI > 0 && diffJ === 0) {
                for (let c = 1; c < diffI; c++) {
                    if (chessboard.isFigureOn(this.coordinateI + c, this.coordinateJ)) {
                        return false
                    }
                }
                return true
            }

            if (diffI < 0 && diffJ === 0) {
                for (let c = 1; c < Math.abs(diffI); c++) {
                    if (chessboard.isFigureOn(this.coordinateI - c, this.coordinateJ)) {
                        return false
                    }
                }
                return true
            }
            return false
        }
    }

    move(targetI: number, targetJ: number): void {
        this.coordinateI = targetI
        this.coordinateJ = targetJ
        this.didMove = true
    }

    die() {
        this.coordinateI = -1
        this.coordinateJ = -1
    }
}
