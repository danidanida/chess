export interface IFigure {
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string

    canMove(targetI: number, targetJ: number): boolean | undefined

    move(targetI: number, targetJ: number): void

    die():void
}
