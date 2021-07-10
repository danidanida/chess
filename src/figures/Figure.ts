interface IFigure {
  color: boolean;
  coordinateI: number;
  coordinateJ: number;
  type: string;
  canMove(targetI: number, targetJ: number): boolean;
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
  canMove(targetI: number, targetJ: number): boolean {
    if (this.color) {
      // if white pawn
      if (this.coordinateI - 1 === targetI && this.coordinateJ === targetJ) {
        return true;
      } else return false;
    } else {
      // if black pawn
      if (this.coordinateI + 1 === targetI && this.coordinateJ === targetJ) {
        return true;
      } else return false;
    }
  }
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
  canMove(targetI: number, targetJ: number): boolean {
    return true;
  }
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
  canMove(targetI: number, targetJ: number): boolean {
    return false;
  }
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
  canMove(targetI: number, targetJ: number): boolean {
    return false;
  }
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
  canMove(targetI: number, targetJ: number): boolean {
    return false;
  }
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
  canMove(targetI: number, targetJ: number): boolean {
    return false;
  }
}
