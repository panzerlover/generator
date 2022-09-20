class Tile {
    e;
    c;
    row;
    col;
    constructor( row, col, e = -1, c = 0){
        this.e = e;
        this.c = c;
        this.row;
        this.col;
    }
}

class BattleMap  {
    arr;
    height;
    width;
    peakHeight;
    slope;
    dirs = [[0, 1],[0, -1],[1, 0], [-1, 0]];
    constructor(height = 25, width = 25, peakHeight = 10, slope = 3){
        this.height = height;
        this.width = width;
        this.peakHeight = peakHeight;
        this.slope = slope;
        this.arr = [];
        this.create();
    }
    create(){
        this.createEmptyArr();
        let first = this.getRandomPoint();

    }
    createEmptyArr(){
        for (let i = 0; i < this.height; i++){
            let row = []
            for (let j = 0; j < this.width; j++){
                row.push(new Tile(i, j))
            }
            this.arr.push(row);
        }
    }
    getRandomPoint(){
        const row = Math.floor(Math.random()*this.height);
        const col = Math.floor(Math.random()*this.width);
        return [row, col]
    }
    getPoint(row, col){
        const tile = this.arr[row][col];
        return [tile.row, tile.col];
    }
    getTile(row, col){
        return this.arr[row][col];
    }
    getUnvisitedPoints(visitedPoints){
        let cells = [];
        for (let p of this.dirs){
            let newPoint = this.getTile(p[0], p[1]);
            let visited = false;
            for (let point of visitedPoints){
                let checkTile = this.getTile(point[0], point[1]);
                if (checkTile.row === newPoint.row && checkTile.col === newPoint.col){
                    visited = true;
                    break;
                }
            }
            if (!visited){
                cells.push(p);
            }
        }
        return cells;
    }
    arrIncludes(arr, row, col){
        if (arr.length === 0){
            return false;
        }
        for (let key of arr){
            if (key[0] === row && key[1] === col){
                return true;
            }
        }
        return false;
    }
    makeHill(visitedPoints, remainingLevel, remainingHeight, row, col){
        let newRemainingLevel = remainingLevel - 1;
        let newRemainingHeight = remainingHeight;
        if (newRemainingLevel === 0){
            newRemainingLevel = this.slope;
            newRemainingHeight -= 1;
        }
        if (remainingHeight <= 0){
            if (!this.arrIncludes(visitedPoints, row, col)){
                    visitedPoints.push([row, col]);
                    const tile = this.getTile(row, col);
                    tile.elevation = newRemainingHeight;
                }
            for (let key of this.dirs){
                    this.makeHill(visitedPoints, newRemainingLevel, newRemainingHeight, key[0], key[1]);
            }


            

        }
    }

}

const b = new BattleMap();
console.log(b.arr)