export default class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Add a vertex (node) to the graph
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Add an edge between two vertices
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.get(vertex1).push(vertex2);
      this.adjacencyList.get(vertex2).push(vertex1); // for undirected graph
    }
  }

  // Remove an edge
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList.get(vertex1).filter((v) => v !== vertex2)
      );
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList.get(vertex2).filter((v) => v !== vertex1)
      );
    }
  }

  // Remove a vertex
  removeVertex(vertex) {
    if (this.adjacencyList.has(vertex)) {
      // Remove all edges associated with the vertex
      this.adjacencyList.get(vertex).forEach((adjVertex) => {
        this.removeEdge(vertex, adjVertex);
      });
      this.adjacencyList.delete(vertex);
    }
  }

  // Display the graph
  displayGraph() {
    for (let [vertex, edges] of this.adjacencyList) {
      console.log(`${vertex} -> ${edges.join(", ")}`);
    }
  }

  // Shortest path using BFS
  shortestPath(start, target) {
    if (!this.adjacencyList.has(start) || !this.adjacencyList.has(target)) {
      return null;
    }

    let queue = [[start]]; // Array to hold paths
    let visited = new Set(); // Set to track visited vertices

    while (queue.length > 0) {
      let path = queue.shift(); // Get the first path in the queue
      let vertex = path[path.length - 1]; // Get the last node from the path

      if (vertex === target) {
        return path; // If the last vertex is the target, return the path
      }

      if (!visited.has(vertex)) {
        visited.add(vertex); // Mark vertex as visited

        // Loop through the neighbors
        for (let neighbor of this.adjacencyList.get(vertex)) {
          let newPath = [...path, neighbor]; // Create new path including the neighbor
          queue.push(newPath); // Add the new path to the queue
        }
      }
    }

    return null; // If no path is found, return null
  }
}
