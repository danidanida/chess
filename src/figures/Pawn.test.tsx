import { Pawn } from "./Pawn"
import { ChessBoard } from "./Chessboard"
//import getInitialFigures from './initialFigures';

describe("Pawn", () => {
    const chessboard = new ChessBoard()
    const pawn__01 = new Pawn(true, 6, 0)
    const pawn__02 = new Pawn(true, 6, 3)

    test("defines canMove()", () => {
        expect(typeof pawn__01.canMove).toBe("function")
    })

    it("describes that white pawn can move 1 cell upfront", () => {
        const resultPawn__01 = pawn__01.canMove(5, 0, chessboard)
        expect(resultPawn__01).toBe(true)
    })
    it("describes that white pawn can move 2 cells upfront", () => {
        const resultPawn__02 = pawn__02.canMove(4, 3, chessboard)

        expect(resultPawn__02).toBe(true)
    })

    it("describes that white pawn can't move right/left", () => {
        const resultPawn__02 = pawn__02.canMove(6, 2, chessboard)

        expect(resultPawn__02).toBe(false)
    })
})
