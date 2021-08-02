import { ChessBoard } from "./Chessboard"

export interface IFigure {
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string
    didMove?: boolean
    promotion?: boolean

    canMove(targetI: number, targetJ: number, chessboard: ChessBoard): boolean | undefined

    move(targetI: number, targetJ: number, chessboard: ChessBoard): void

    die(): void
}
