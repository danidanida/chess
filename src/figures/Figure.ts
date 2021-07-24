export interface IFigure {
    color: boolean
    coordinateI: number
    coordinateJ: number
    type: string
    didMove?:boolean

    canMove(targetI: number, targetJ: number): boolean | undefined

    move(targetI: number, targetJ: number): void

    die():void
}
