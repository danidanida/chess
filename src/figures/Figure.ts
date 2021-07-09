interface IFigure {
  color: boolean
  coordinateI: number
  coordinateJ: number
  type: string
 // canMove(targetI: number, targetJ: number): boolean
}

export class Pawn implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "pawn";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;

  /*canMove(targetI: number, targetJ: number): boolean {
    if(this.color) {
      if(targetI - this.coordinateI === 1) {
        return true;
      }
      else return false
    }
    else {
      if(targetI - this.coordinateI === -1) {
        return true
    } return false
  } */

}

export class King implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "king";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;

}

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
}

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

}

export class Queen implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "queen";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;

}

export class Bishop implements IFigure {
  constructor(color: boolean, coordinateI: number, coordinateJ: number) {
    this.color = color;
    this.coordinateI = coordinateI;
    this.coordinateJ = coordinateJ;
    this.type = "bishop";
  }
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;

}
//const arr: IFigure[] = [new King(), new King(), new Pawn()]




//export { }
