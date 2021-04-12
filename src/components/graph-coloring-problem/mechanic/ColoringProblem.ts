import { log } from "../../../util";
import { CSP } from "../../csp/CSP";
import { ILine, IRegion, Point } from "../types";
import * as mechanic from "./index";
import _ from "lodash";
import { IVariable } from "../../csp/types";
import { isSamePoint } from "./core";

enum Color {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
  YELLOW = 'yellow',
  BROWN = 'brown',
  VIOLET = 'violet',
  ORANGE = 'orange'
}

export class ColoringProblem {
  private width: number;
  private height: number;
  private nPoints: number;
  private regions: IRegion[];
  private colors: Color[];

  constructor(mapWidth: number, mapHeight: number, nPoints: number, colors?: number) {
    this.width = mapWidth;
    this.height = mapHeight;
    this.nPoints = nPoints;
    this.regions = [];
    this.colors = [];
    if(!colors)
      colors = 3;
    const availableColors = Object.values(Color);
    for(let i = 0; i < colors; i++) {
      this.colors.push(availableColors[i]);  
    }
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
    this.regions = regions;
    return regions;
  }

  private isDifferent(
    region: IVariable<Point, Color>, 
    neighbor: IVariable<Point, Color>
  ) {
    if(!neighbor.value)
      return true;
    return region.value !== neighbor.value;
  }

  solve() {
    const csp = new CSP<Point, Color>();
    const variables = [];
    for(let v = 0; v < this.regions.length; v++) {
      const region = this.regions[v];
      variables.push( { id: region.point,  value: <Color> region.color });
    }
    for(let i = 0; i < this.regions.length; i++) {
      const region = this.regions[i];
      const variable = variables[i];
      const domain = this.colors;
      csp.addVariable(variable, domain);
      for(let n = 0; n < region.neighbors.length; n++) {
        const neighbor = region.neighbors[n];
        const neighborVar = variables.find(v => isSamePoint(v.id, neighbor.point));
        csp.addConstraint(() => this.isDifferent(variable, neighborVar));
      }
    }
    csp.backtracing();
    const solution = csp.getFirstSolution();
    if(solution) {
      for(let i = 0; i < solution.length; i++) {
        const region = this.regions.find(r => isSamePoint(r.point, solution[i].id));
        region.color = solution[i].value;
      }
    } else {
      console.info('No solution');
    }
    
  }
}
