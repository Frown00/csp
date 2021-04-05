import { ILine, IRegion } from "../types";
import * as mechanic from "./index";

enum COLOR {
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREEN = 'green',
  RED = 'red'
}

export class MapColoringProblem {
  private width: number;
  private height: number;
  private nPoints: number;

  constructor(mapWidth: number, mapHeight: number, nPoints: number) {
    this.width = mapWidth;
    this.height = mapHeight;
    this.nPoints = nPoints;
  }

  generate() {
    const regions: IRegion[] = [];
    for(let i = 0; i < this.nPoints; i++) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      regions.push({ point: [x, y], neighbors: [] });
    }
    const lines: ILine[] = [];
    let actual = regions[0];
    let i = 0;
    while(true) {
      const available = regions.filter(r => !mechanic.isSamePoint(actual.point, r.point));
      const possible = available.filter(
        r => !actual.neighbors.find(n => mechanic.isSamePoint(n.point, r.point))
      );
      let neighbor = mechanic.findNeighbor(actual, possible, lines);
      if(!neighbor)
        break;
      actual.neighbors.push(neighbor);
      neighbor.neighbors.push(actual);
      lines.push({start: actual.point, end: neighbor.point });
      actual = neighbor;
      i++;
    }
    return regions;
  }

  solve() {
    //
  }
}
