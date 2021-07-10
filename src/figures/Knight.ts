import { IFigure } from "./Figure";

export class Knight implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "knight";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;
  canMove(targetI: number, targetJ: number): boolean | undefined {
    if (
      (this.coordinateI - 2 === targetI || this.coordinateI + 2 === targetI) &&
      (this.coordinateJ - 1 === targetJ || this.coordinateJ + 1 === targetJ)
    ) {
      return true;
    }
  }
}
