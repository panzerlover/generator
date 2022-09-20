class Tile {
  e;
  c;
  row;
  col;
  constructor(row, col, e = 0, c = 0) {
    this.e = e;
    this.c = c;
    this.row = row;
    this.col = col;
  }
}

class BattleMap {
  arr;
  height;
  width;
  peakHeight;
  slope;
  dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  constructor(height = 20, width = 50, peakHeight = 9, slope = 2) {
    this.height = height;
    this.width = width;
    this.peakHeight = peakHeight;
    this.slope = slope;
    this.arr = [];
    this.create();
  }
  create() {
    this.createEmptyArr();
    let first = this.getRandomPoint();
    let visitedPoints = [];
    let remainingHeight = this.peakHeight;
    let remainingLevel = this.slope;
    this.makeHill(
      visitedPoints,
      remainingLevel,
      remainingHeight,
      first[0],
      first[1]
    );
  }
  createEmptyArr() {
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Tile(i, j));
      }
      this.arr.push(row);
    }
  }
  getRandomPoint() {
    const row = Math.floor(Math.random() * this.height);
    const col = Math.floor(Math.random() * this.width);
    console.log(row, col);
    return [row, col];
  }
  getPoint(row, col) {
    const tile = this.arr[row][col];
    return [tile.row, tile.col];
  }
  getTile(row, col) {
    let tile = this.arr[row][col];
    return tile;
  }
  isValidTile(row, col) {
    let valid =
      row > -1 &&
      col > -1 &&
      this.arr.length > row &&
      this.arr[row].length > col;
    return valid;
  }
  getUnvisitedPoints(visitedPoints, row, col) {
    let cells = [];
    for (let p of this.dirs) {
      const newRow = p[0] + row;
      const newCol = p[1] + col;
      if (this.isValidTile(newRow, newCol)) {
        let newTile = this.getTile(newRow, newCol);
        let visited = false;
        if (visitedPoints.length !== 0) {
          for (let point of visitedPoints) {
            let checkTile = this.getTile(point[0], point[1]);
            if (
              checkTile.row === newTile.row &&
              checkTile.col === newTile.col
            ) {
              visited = true;
              break;
            }
          }
          if (!visited) {
            cells.push([newRow, newCol]);
          }
        } else {
          cells.push([newRow, newCol]);
        }
      }
    }
    return cells;
  }
  arrIncludes(passedArr, row, col) {
    if (passedArr.length === 0) {
      return false;
    }
    for (let key of passedArr) {
      if (key[0] === row && key[1] === col) {
        return true;
      }
    }
    return false;
  }
  makeHill(visitedPoints, remainingLevel, remainingHeight, row, col) {
    if (this.isValidTile(row, col)) {
      let newRemainingLevel = remainingLevel - 1;
      let newRemainingHeight = remainingHeight;
      if (newRemainingLevel === 0) {
        newRemainingLevel = this.slope;
        newRemainingHeight -= 1;
      }
      if (remainingHeight > 0) {
        if (!this.arrIncludes(visitedPoints, row, col)) {
          visitedPoints.push([row, col]);
          let tile = this.getTile(row, col);
          tile.e += newRemainingHeight;
        }
        const unvisited = this.getUnvisitedPoints(visitedPoints, row, col);
        for (let key of unvisited){
            let tile = this.getTile(key[0], key[1]);
            tile.e += newRemainingHeight;
            visitedPoints.push([key[0], key[1]])
        }

        for (let key of unvisited) {
            
          this.makeHill(
            visitedPoints,
            newRemainingLevel,
            newRemainingHeight,
            key[0],
            key[1]
          );
        }
      }
    }
  }
  stringify() {
    let returnarr = [];
    for (let key of this.arr) {
      let s = "";
      for (let k of key) {
        if (k.e != 0){
        s += k.e;
        } else {
            s += " ";
        }
      }
      returnarr.push(s);
    }
    return returnarr;
  }
}

const b = new BattleMap();
console.log(b.stringify());
