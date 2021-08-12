export function toHorizontalRight(chessboard:any, diff:number,i:number,j:number) {
        /*for (let c = 1; c < diff; c++) {
            if (chessboard.isFigureOn(i, j + c)) {
                return false
            }
        }
        return true*/
        return checkHorizontalRight(i,j,diff, (fi,fj) => chessboard.isFigureOn(fi,fj))
}

export function checkHorizontalRight(startingI: number, startingJ:number,distance:number, checkFunction: (i:number, j:number)=>boolean) {
    for (let c = 1; c < distance; c++) {
        if(checkFunction(startingI, startingJ+c)) {
            return false
        }
    }
    return true
}

export function toHorizontalLeft() {}

export function toVerticalRight() {}

export function toVerticalLeft() {}

export function toDiagonalUpperRight() {}

export function toDiagonalUpperLeft() {}

export function toDiagonalBottomRight() {}

export function toDiagonalBottomLeft() {}
