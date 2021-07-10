import { IFigure } from "./Figure";

export class Rook implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "rook";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;

  canMove(targetI: number, targetJ: number): boolean | undefined {
    // both colors rook logic
    if (this.coordinateI === targetI || this.coordinateJ === targetJ) {
      return true;
    }
  }

  move(targetI:number, targetJ:number) : void {
    this.coordinateI = targetI;
    this.coordinateJ = targetJ;
}
}
