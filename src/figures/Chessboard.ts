import { Pawn } from "./Pawn"
import { King } from "./King"
import { Queen } from "./Queen"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Knight } from "./Knight"
import { IFigure } from "./Figure"

export class ChessBoard {
    constructor() {
        this.figures = [
            new Pawn(true, 6, 0),
            new Pawn(true, 6, 1),
            new Pawn(true, 6, 2),
            new Pawn(true, 6, 3),
            new Pawn(true, 6, 4),
            new Pawn(true, 6, 5),
            new Pawn(true, 6, 6),
            new Pawn(true, 6, 7),

            new Pawn(false, 1, 0),
            new Pawn(false, 1, 1),
            new Pawn(false, 1, 2),
            new Pawn(false, 1, 3),
            new Pawn(false, 1, 4),
            new Pawn(false, 1, 5),
            new Pawn(false, 1, 6),
            new Pawn(false, 1, 7),

            new Knight(false, 0, 1),
            new Knight(false, 0, 6),

            new Knight(true, 7, 1),
            //new Knight(true, 7, 6),

            new Rook(true, 7, 0),
            new Rook(true, 7, 7),

            new Rook(false, 0, 0),
            new Rook(false, 0, 7),

            new Queen(true, 7, 3),
            new Queen(false, 0, 3),

            new King(true, 7, 4),
            new King(false, 0, 4),

            new Bishop(true, 7, 2),
            //new Bishop(true, 7, 5),

            new Bishop(false, 0, 2),
            new Bishop(false, 0, 5),
        ]
        this.turn = true
        this.selectedI = undefined
        this.selectedJ = undefined
        this.promotion = false
        this.check = false
        this.checkMate = false
        this.history = []
    }
    figures: Array<IFigure>
    turn: boolean
    selectedI: number | undefined
    selectedJ: number | undefined
    promotion: boolean
    check: boolean
    checkMate: boolean
    history: Array<{
        figure: IFigure
        figureDidMove: boolean | undefined
        from: { i: number; j: number }
        to: { i: number; j: number }
        killedFigure: IFigure | null
        killedFigureCoordinates: { i: number; j: number } | null
        isCastling: boolean
    }>

    isFigureOn = (i: number, j: number): boolean => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j).length > 0
    }

    getFigure = (i: number, j: number): IFigure => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
    }

    areCoordinatesSelected(): boolean {
        return this.selectedI !== undefined && this.selectedJ !== undefined
    }

    getSelectedFigure(): IFigure {
        return this.getFigure(this.selectedI ?? -3, this.selectedJ ?? -3)
    }

    deselect(): void {
        this.selectedI = undefined
        this.selectedJ = undefined
    }

    promoteFigure = (type: string) => {
        const pawn = this.figures
            .filter((f) => f.type === "pawn")
            .map((f) => f as Pawn)
            .find((f) => f.promotion)

        if (pawn) {
            switch (type) {
                case "bishop":
                    this.figures.push(new Bishop(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "queen":
                    this.figures.push(new Queen(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "knight":
                    this.figures.push(new Knight(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
                case "rook":
                    this.figures.push(new Rook(pawn.color, pawn.coordinateI, pawn.coordinateJ))
                    break
            }

            pawn.move(-2, -2)
            pawn.promotion = false
            this.promotion = false
        }
    }

    checkIfCellIsUnderAttack(side: boolean, i: number, j: number): boolean {
        return this.figures.some((f) => f.color !== side && f.canMove(i, j, this))
    }

    checkIfKingUnderAttack(side: boolean): boolean {
        const king = this.figures.filter((f) => f.type === "king" && f.color === side)[0]
        if (king && this.checkIfCellIsUnderAttack(side, king.coordinateI, king.coordinateJ)) {
            this.check = true
            return true
        }
        this.check = false
        return false
    }

    private canKingEscape(side: boolean): boolean {
        const king = this.figures.filter((f) => f.type === "king" && f.color === side)[0]

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (king.canMove(i, j, this)) {
                    if (this.figures.some((f) => f.color !== side && f.canMove(i, j, this))) {
                        return true
                    }
                }
            }
        }
        return false
    }

    private canAttackingFigureBeKilled(side: boolean): boolean {
        const king = this.figures.filter((f) => f.type === "king" && f.color === side)[0]

        const attackerAmount = this.figures.filter(
            (f) => f.color !== side && f.canMove(king.coordinateI, king.coordinateJ, this)
        ).length

        const attacker = this.figures.filter(
            (f) => f.color !== side && f.canMove(king.coordinateI, king.coordinateJ, this)
        )[0]

        if (
            attackerAmount === 1 &&
            attacker &&
            this.figures.some(
                (f) =>
                    f.color === side && f.type !== "king" && f.canMove(attacker.coordinateI, attacker.coordinateJ, this)
            )
        ) {
            return true
        }
        return false
    }

    private checkIfAnyFigureCanStandBetween(side: boolean, i: number, j: number): boolean {
        return this.figures.some((f) => f.color === side && f.type !== "king" && f.canMove(i, j, this))
    }

    private canAnythingStandBetweenKingAndAttacker(side: boolean): boolean {
        const king = this.figures.filter((f) => f.type === "king" && f.color === side)[0]

        const attackerAmount = this.figures.filter(
            (f) => f.color !== side && f.canMove(king.coordinateI, king.coordinateJ, this)
        ).length

        if (attackerAmount > 1) {
            return false
        }

        const attacker = this.figures.filter(
            (f) => f.color !== side && f.canMove(king.coordinateI, king.coordinateJ, this)
        )[0]

        const diffI = attacker && attacker.coordinateI - king.coordinateI
        const diffJ = attacker && attacker.coordinateJ - king.coordinateJ
        if (attacker && attacker.type === "knight") {
            return false
        }
        if (attacker && attacker.type === "pawn") {
            return false
        }
        if (attacker && attacker.type === "king") {
            return false
        }
        if (attacker && attacker.type === "bishop") {
            if (Math.abs(diffI) === Math.abs(diffJ)) {
                if (diffI > 0 && diffJ > 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, king.coordinateJ + c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI - c, king.coordinateJ + c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI - c, king.coordinateJ - c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ < 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, king.coordinateJ - c)) {
                            return true
                        }
                    }
                    return false
                }
            }
        }
        if (attacker && attacker.type === "queen") {
            if (Math.abs(diffI) === Math.abs(diffJ)) {
                if (diffI > 0 && diffJ > 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, king.coordinateJ + c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI - c, king.coordinateJ + c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI - c, king.coordinateJ - c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ < 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, king.coordinateJ - c)) {
                            return true
                        }
                    }
                    return false
                }
            } else {
                if (diffI === 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI, king.coordinateI + c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI === 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffJ); c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI, king.coordinateI - c)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ === 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, attacker.coordinateJ)) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ === 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (
                            this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI - c, attacker.coordinateJ)
                        ) {
                            return true
                        }
                    }
                    return false
                }
            }
        }
        if (attacker && attacker.type === "rook") {
            if (diffI === 0 && diffJ > 0) {
                for (let c = 1; c < diffJ; c++) {
                    if (this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI, king.coordinateI + c)) {
                        return true
                    }
                }
                return false
            }
            if (diffI === 0 && diffJ < 0) {
                for (let c = 1; c < Math.abs(diffJ); c++) {
                    if (this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI, king.coordinateI - c)) {
                        return true
                    }
                }
                return false
            }
            if (diffI > 0 && diffJ === 0) {
                for (let c = 1; c < diffI; c++) {
                    if (this.checkIfAnyFigureCanStandBetween(side, king.coordinateI + c, attacker.coordinateJ)) {
                        return true
                    }
                }
                return false
            }
            if (diffI < 0 && diffJ === 0) {
                for (let c = 1; c < Math.abs(diffI); c++) {
                    if (this.checkIfAnyFigureCanStandBetween(side, attacker.coordinateI - c, attacker.coordinateJ)) {
                        return true
                    }
                }
                return false
            }
        }
        return false
    }

    checkIfKingUnderCheckMate(side: boolean): boolean {
        console.log(this.canAnythingStandBetweenKingAndAttacker(side))
        const isKingUnderAttack = this.checkIfKingUnderAttack(side)
        const kingCantEscape = !this.canKingEscape(side)
        const attackerCantBeKilled = !this.canAttackingFigureBeKilled(side)
        const nothingCanStandInBetween = !this.canAnythingStandBetweenKingAndAttacker(side)
        if (isKingUnderAttack && kingCantEscape && attackerCantBeKilled && nothingCanStandInBetween) {
            this.checkMate = true
            return true
        }
        this.checkMate = false
        return false
    }

    toggleTurn() {
        if (this.turn === true) {
            return (this.turn = false)
        } else return (this.turn = true)
    }

    saveInHistory(figure: IFigure, i: number, j: number, killedFigure: IFigure | null, isCastling: boolean) {
        const current = { i: figure.coordinateI, j: figure.coordinateJ }
        const killed = killedFigure && { i: killedFigure.coordinateI, j: killedFigure.coordinateJ }
        const killedFigureCoordinates = killedFigure ? killed : null
        this.history.push({
            figure,
            figureDidMove: figure.didMove,
            from: current,
            to: { i, j },
            killedFigure,
            killedFigureCoordinates,
            isCastling,
        })
    }

    private moveBackWithoutToggleTurn() {
        const history = this.history

        if (history.length === 0) {
            return
        }
        const lastItem = history.length === 1 ? history[0] : history[history.length - 1]
        history.pop()
        const figure = lastItem.figure
        if (lastItem.killedFigure !== null && lastItem.killedFigureCoordinates !== null) {
            const killedFigure = lastItem.killedFigure
            const killedFigureInitialPosition = lastItem.killedFigureCoordinates
            killedFigure.coordinateI = killedFigureInitialPosition.i
            killedFigure.coordinateJ = killedFigureInitialPosition.j
        }
        if (lastItem.isCastling) {
            figure.didMove = false
            const rook = this.getFigure(7, 5)
            const rookCorner = figure.coordinateJ === 6 ? 7 : 0
            rook.move(figure.coordinateI, rookCorner, this)
            rook.didMove = false
        }

        figure.move(lastItem.from.i, lastItem.from.j, this)
        figure.didMove = lastItem.figureDidMove
    }

    moveBack() {
        this.moveBackWithoutToggleTurn()
        this.toggleTurn()
    }

    select(i: number, j: number) {
        const selectedFigure = this.getFigure(i, j)
        if (selectedFigure) {
            if (selectedFigure.color === this.turn) {
                this.selectedI = i
                this.selectedJ = j
            }
        }
    }

    private makeMoveWithoutToggleTurn(i: number, j: number) {
        const selectedFigure = this.getSelectedFigure()

        const targetFigure = this.getFigure(i, j)

        let castling = false
        if (selectedFigure.type === "king" && (j === 2 || j === 6)) {
            castling = true
        }
        this.saveInHistory(selectedFigure, i, j, targetFigure || null, castling)
        if (targetFigure) {
            targetFigure.die()
        }
        selectedFigure.move(i, j, this)
    }

    makeMove(i: number, j: number) {
        const selectedFigure = this.getSelectedFigure()
        if (!selectedFigure) {
            this.deselect()
            return
        }
        if (!selectedFigure.canMove(i, j, this)) {
            return
        }
        this.makeMoveWithoutToggleTurn(i, j)
        this.toggleTurn()
        this.deselect()
    }

    private checkifFigureMoveCauseCheckMate(i: number, j: number) {
        this.makeMoveWithoutToggleTurn(i, j)
        const isKingUnderAttack = this.checkIfKingUnderAttack(this.turn)
        this.moveBackWithoutToggleTurn()
        return !isKingUnderAttack
    }

    public canMove(i: number, j: number) {
        if (i === 7 && j === 6) {
            console.log("fuchu")
        }
        const selectedFigure = this.getSelectedFigure()
        if (!selectedFigure) {
            return false
        }
        if (!selectedFigure.canMove(i, j, this)) {
            return false
        }
        const moveDoNotCauseCheckMate = this.checkifFigureMoveCauseCheckMate(i, j)
        return moveDoNotCauseCheckMate
    }
}
