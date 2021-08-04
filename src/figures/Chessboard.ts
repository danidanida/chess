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
            new Knight(true, 7, 6),

            new Rook(true, 7, 0),
            new Rook(true, 7, 7),

            new Rook(false, 0, 0),
            new Rook(false, 0, 7),

            new Queen(true, 7, 3),
            new Queen(false, 0, 3),

            new King(true, 7, 4),
            new King(false, 0, 4),

            new Bishop(true, 7, 2),
            new Bishop(true, 7, 5),

            new Bishop(false, 0, 2),
            new Bishop(false, 0, 5),
        ]
        this.turn = true
        this.check = false
        this.checkMate = false
    }
    figures: Array<IFigure>
    turn: boolean
    check: boolean
    checkMate: boolean

    isFigureOn = (i: number, j: number): boolean => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j).length > 0
    }

    getFigure = (i: number, j: number): IFigure => {
        return this.figures.filter((f) => f.coordinateI === i && f.coordinateJ === j)[0]
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
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI + c, king.coordinateJ + c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI - c, king.coordinateJ + c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI - c, king.coordinateJ - c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ < 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI + c, king.coordinateJ - c, this)
                            )
                        ) {
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
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI + c, king.coordinateJ + c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI - c, king.coordinateJ + c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI - c, king.coordinateJ - c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ < 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI + c, king.coordinateJ - c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
            } else {
                if (diffI === 0 && diffJ > 0) {
                    for (let c = 1; c < diffJ; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(attacker.coordinateI, king.coordinateI + c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI === 0 && diffJ < 0) {
                    for (let c = 1; c < Math.abs(diffJ); c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(attacker.coordinateI, king.coordinateI - c, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI > 0 && diffJ === 0) {
                    for (let c = 1; c < diffI; c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(king.coordinateI + c, attacker.coordinateJ, this)
                            )
                        ) {
                            return true
                        }
                    }
                    return false
                }
                if (diffI < 0 && diffJ === 0) {
                    for (let c = 1; c < Math.abs(diffI); c++) {
                        if (
                            this.figures.some(
                                (f) =>
                                    f.color === side &&
                                    f.type !== "king" &&
                                    f.canMove(attacker.coordinateI - c, attacker.coordinateJ, this)
                            )
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
                    if (
                        this.figures.some(
                            (f) =>
                                f.color === side &&
                                f.type !== "king" &&
                                f.canMove(attacker.coordinateI, king.coordinateI + c, this)
                        )
                    ) {
                        return true
                    }
                }
                return false
            }
            if (diffI === 0 && diffJ < 0) {
                for (let c = 1; c < Math.abs(diffJ); c++) {
                    if (
                        this.figures.some(
                            (f) =>
                                f.color === side &&
                                f.type !== "king" &&
                                f.canMove(attacker.coordinateI, king.coordinateI - c, this)
                        )
                    ) {
                        return true
                    }
                }
                return false
            }
            if (diffI > 0 && diffJ === 0) {
                for (let c = 1; c < diffI; c++) {
                    if (
                        this.figures.some(
                            (f) =>
                                f.color === side &&
                                f.type !== "king" &&
                                f.canMove(king.coordinateI + c, attacker.coordinateJ, this)
                        )
                    ) {
                        return true
                    }
                }
                return false
            }
            if (diffI < 0 && diffJ === 0) {
                for (let c = 1; c < Math.abs(diffI); c++) {
                    if (
                        this.figures.some(
                            (f) =>
                                f.color === side &&
                                f.type !== "king" &&
                                f.canMove(attacker.coordinateI - c, attacker.coordinateJ, this)
                        )
                    ) {
                        return true
                    }
                }
                return false
            }
        }
        return false
    }

    checkIfKingUnderCheckMate(side: boolean): boolean {
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
}
