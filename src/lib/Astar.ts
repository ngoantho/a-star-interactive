import BinaryHeap from "./BinaryHeap";
import Graph from "./Graph";
import GridNode from "./GridNode";

function pathTo(node: GridNode) {
  let curr = node;
  let path: GridNode[] = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
}
let getHeap = () => new BinaryHeap((node: GridNode) => node.f);

// performs an A* search on a graph given a start and end node
function search(
  graph: Graph,
  start: GridNode,
  end: GridNode,
  closest = true,
  heuristic = heuristics.manhattan
) {
  graph.cleanDirty();

  let openHeap = getHeap();
  let closestNode = start;

  start.h = heuristic(start, end);
  graph.markDirty(start);

  openHeap.push(start);

  while (openHeap.size() > 0) {
    // this is the lowest f(x) to process next
    let currentNode: GridNode = openHeap.pop();

    // end case, found path
    if (currentNode == end) {
      return pathTo(currentNode);
    }

    // not the end
    currentNode.closed = true;

    let neighbors = graph.neighbors(currentNode);
    for (let i = 0, ilen = neighbors.length; i < ilen; ++i) {
      let neighbor = neighbors[i];

      if (neighbor.closed || neighbor.isWall()) {
        continue;
      }

      let gScore = currentNode.g + neighbor.getCost(currentNode);
      let visited = neighbor.visited;

      if (!visited || gScore < neighbor.g) {
        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
        neighbor.visited = true;
        neighbor.parent = currentNode;
        neighbor.h = neighbor.h || heuristic(neighbor, end);
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        graph.markDirty(neighbor);
        if (closest) {
          // If the neighbour is closer than the current closestNode or if it's equally close but has
          // a cheaper path than the current closest node then it becomes the closest node
          if (
            neighbor.h < closestNode.h ||
            (neighbor.h === closestNode.h && neighbor.g < closestNode.g)
          ) {
            closestNode = neighbor;
          }
        }

        if (!visited) {
          // Pushing to heap will put it in proper place based on the 'f' value.
          openHeap.push(neighbor);
        } else {
          // Already seen the node, but since it has been rescored we need to reorder it in the heap
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }

  if (closest) {
    return pathTo(closestNode);
  }
  return [];
}

let heuristics = {
  manhattan(pos0: GridNode, pos1: GridNode) {
    let d1 = Math.abs(pos1.x - pos0.x);
    let d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  },
  diagonal(pos0: GridNode, pos1: GridNode) {
    let D = 1;
    let D2 = Math.sqrt(2);
    let d1 = Math.abs(pos1.x - pos0.x);
    let d2 = Math.abs(pos1.y - pos0.y);
    return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
  },
};

function cleanNode(node: GridNode) {
  node.f = 0;
  node.g = 0;
  node.h = 0;
  node.visited = false;
  node.closed = false;
  node.parent = null;
}

export { search, heuristics, cleanNode };
