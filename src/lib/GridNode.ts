// some code based on https://github.com/bgrins/javascript-astar
// adapted for TypeScript

export default class GridNode {
  x: number;
  y: number;
  weight: number;
  f!: number;
  g!: number;
  h!: number;
  visited!: boolean;
  closed!: boolean;
  parent!: GridNode | null;

  constructor(x: number, y: number, weight: number) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  toString() {
    return "[" + this.x + " " + this.y + "]";
  }

  getCost(fromNeighbor: GridNode) {
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
      return this.weight * 1.41421;
    }
    return this.weight;
  }

  isWall() {
    return this.weight === 0;
  }
}
