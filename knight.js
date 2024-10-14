import Graph from "./graph.js";

export default class knight {
  constructor() {
    this.graph = new Graph();
  }
  validMove(x, y) {
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      return { x, y };
    } else {
      return null;
    }
  }

  possibleMoves(move) {
    let arr = [];
    arr.push(this.validMove(move.x + 1, move.y + 2));
    arr.push(this.validMove(move.x + 2, move.y + 1));
    arr.push(this.validMove(move.x + 1, move.y - 2));
    arr.push(this.validMove(move.x + 2, move.y - 1));
    arr.push(this.validMove(move.x - 1, move.y + 2));
    arr.push(this.validMove(move.x - 2, move.y + 1));
    arr.push(this.validMove(move.x - 1, move.y - 2));
    arr.push(this.validMove(move.x - 2, move.y - 1));

    return arr.filter((e) => {
      if (e != null) return e;
    });
  }

  findAllMoves(startPoint, visited = new Set()) {
    let stringStartPoint = this.objectToString(startPoint);

    if (visited.has(stringStartPoint)) {
      return;
    }

    visited.add(stringStartPoint);
    this.graph.addVertex(stringStartPoint);

    let res = this.possibleMoves(startPoint);
    res.forEach((move) => {
      let stringMove = this.objectToString(move);
      this.graph.addVertex(stringMove);
      this.graph.addEdge(stringStartPoint, stringMove);

      this.findAllMoves(move, visited);
    });
  }

  objectToString(position) {
    return `${position.x},${position.y}`;
  }
}
