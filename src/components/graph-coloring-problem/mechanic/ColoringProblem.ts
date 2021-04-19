import { log } from "../../../util";
import { CSP } from "../../csp/CSP";
import { ILine, IRegion, Point } from "../types";
import * as mechanic from "./index";
import _, { remove } from "lodash";
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
      
      let isExists = true;
      let point: Point = null
      while(isExists) {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        point = [x, y];
        isExists = !!regions.find(r => isSamePoint(r.point, point));
      }
      regions.push({ point, neighbors: [] });
    }
    const lines: ILine[] = [];
    const possibleIdx = [];
    for(let i = 0; i < regions.length; i++) {
      possibleIdx.push(i);
    }
    while(possibleIdx.length > 0) {
      const idx = possibleIdx[Math.floor(Math.random() * possibleIdx.length)];
      const actual = regions[idx];
      const available = regions.filter(r => !mechanic.isSamePoint(actual.point, r.point));
      const possible = available.filter(
        r => !actual.neighbors.find(n => mechanic.isSamePoint(n.point, r.point))
      );
      let neighbor = mechanic.findNeighbor(actual, possible, lines);
      if(neighbor) {
        actual.neighbors.push(neighbor);
        neighbor.neighbors.push(actual);
        lines.push({ start: actual.point, end: neighbor.point });
      } else {
        const removeId = possibleIdx.indexOf(idx);
        possibleIdx.splice(removeId, 1);
      }
    }
    this.regions = regions;
    return regions;
  }

  private isDifferent(
    region: IVariable<Point>, 
    neighbor: IVariable<Point>
  ) {
    if(!neighbor.value[0])
      return true;
    return region.value[0] !== neighbor.value[0];
  }

  solveForward() {
    const csp = new CSP<Point>();
    const variables: IVariable<Point>[] = [];
    for(let v = 0; v < this.regions.length; v++) {
      const region = this.regions[v];
      variables.push({ 
        id: region.point,  
        value: [], 
      });
    }
    for(let i = 0; i < this.regions.length; i++) {
      const region = this.regions[i];
      const variable = variables[i];
      csp.addVariable(variable);
      csp.addDomain(i, [...this.colors]);
      for(let n = 0; n < region.neighbors.length; n++) {
        const neighbor = region.neighbors[n];
        const neighborVar = variables.find(v => isSamePoint(v.id, neighbor.point));
        csp.addConstraints(() => this.isDifferent(variable, neighborVar));
      }
    }
    const start = Date.now();
    csp.forward();
    const end = Date.now();
    console.log('Forward time: ', (end - start));

    const solution = csp.getRandomSolution();
    if(solution) {
      for(let i = 0; i < solution.length; i++) {
        const region = this.regions.find(r => isSamePoint(r.point, solution[i].id));
        region.color = solution[i].value[0];
      }
      console.info('There are', csp.getSolutionsCount(), 'possible ways to solve this problem');
    } else {
      console.info('No solution');
    }
    console.log(this.regions);
    return csp.getSolutionsCount();
  }

  solveBackTracing() {
    const csp = new CSP<Point>();
    const variables: IVariable<Point>[] = [];
    for(let v = 0; v < this.regions.length; v++) {
      const region = this.regions[v];
      variables.push({ 
        id: region.point,  
        value: [], 
      });
    }
    for(let i = 0; i < this.regions.length; i++) {
      const region = this.regions[i];
      const variable = variables[i];
      csp.addVariable(variable);
      csp.addDomain(i, [...this.colors]);
      for(let n = 0; n < region.neighbors.length; n++) {
        const neighbor = region.neighbors[n];
        const neighborVar = variables.find(v => isSamePoint(v.id, neighbor.point));
        csp.addConstraints(() => this.isDifferent(variable, neighborVar));
      }
    }
    const start2 = Date.now();
    csp.backtracking();
    const end2 = Date.now();
    console.log('Backtracking time: ', (end2 - start2));

    const solution = csp.getRandomSolution();
    if(solution) {
      for(let i = 0; i < solution.length; i++) {
        const region = this.regions.find(r => isSamePoint(r.point, solution[i].id));
        region.color = solution[i].value[0];
      }
      console.info('There are', csp.getSolutionsCount(), 'possible ways to solve this problem');
    } else {
      console.info('No solution');
    }
    console.log(this.regions);
    return csp.getSolutionsCount();
  }
}
