import { Pawn } from "./Pawn"
import { ChessBoard } from "./Chessboard"
//import getInitialFigures from './initialFigures';

describe("Pawn", () => {
    const chessboard = new ChessBoard()

    it("describes that white pawn can move 1 cell upfront", () => {
        const pawn = new Pawn(true, 6, 0)
        const result = pawn.canMove(5, 0, chessboard)
        expect(result).toBe(true)
    })
    it("describes that white pawn can move 2 cells upfront", () => {
        const pawn = new Pawn(true, 6, 3)
        const result = pawn.canMove(4, 3, chessboard)

        expect(result).toBe(true)
    })

    it("describes that white pawn can't move right/left", () => {
        const pawn = new Pawn(true, 6, 3)
        const result = pawn.canMove(6, 2, chessboard)

        expect(result).toBe(false)
    })
})
