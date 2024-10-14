import knight from "./knight.js";

var night = new knight();
night.findAllMoves({ x: 3, y: 3 });
night.graph.displayGraph();
console.log(night.graph.shortestPath("3,3", "6,6"));
