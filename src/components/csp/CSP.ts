import _ from "lodash";
import { IVariable } from "./types";

type State<V> = { variable: IVariable<V>, domain: any[] }[];

export class CSP<V> {
  private variables: IVariable<V>[]
  private constraints: (() => boolean)[]
  private domains: any[][][];
  private solutions:  IVariable<V>[][]
  private state: State<V>
  private visitedNodes: number

  constructor() {
    this.variables = [];
    this.constraints = [];
    this.solutions = [];
    this.state = [];
    this.domains = [];
  }

  getFirstSolution() {
    if(this.solutions.length > 0)
      return this.solutions[0];
    return null;
  }

  getRandomSolution() {
    if(this.solutions.length > 0) {
      const random = Math.floor(Math.random() * this.solutions.length);
      return this.solutions[random];
    }
    return null;
  }

  getSolutionsCount() {
    return this.solutions.length;
  }

  addVariable(variable: { id: V, value: any[] }) {
    this.variables.push(variable);
  }

  addDomain(i: number, domain: any[]) {
    if(!this.domains[i]) {
      this.domains[i] = [];
    }
    this.domains[i].push(domain);
  }

  addConstraints(...constraints: (() => boolean)[]) {
    this.constraints.push(...constraints);
  }

  backtracking() {
    this.visitedNodes = 0;
    this.backtrack(0);
    console.log("Backtracking nodes", this.visitedNodes);
    if(this.solutions.length <= 0) {
      return false;
    }
    return true;
  }

  forward() {
    this.visitedNodes = 0;
    this.forwardChecking(0, _.cloneDeep(this.domains));
    console.log("Forward nodes", this.visitedNodes);
    if(this.solutions.length <= 0) {
      return false;
    }
    return true;
  }

  private backtrack(i: number) {
    const isComplete = this.variables.every(v => v.value[0]);
    if(isComplete) {
      if(this.isSatisfied()) {
        // solution
        this.solutions.push(_.cloneDeep(this.variables));
        return false;
      }
      return false;
    }
    const id = this.getMostConstrainedVariable();
    const variable = this.variables[id];
    const domains = this.domains[id];
    for(let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      for(let c = 0; c < domain.length; c++) {
        this.visitedNodes++;
        const value = domain[c];
        variable.value[i] = value;
        if(this.isSatisfied()) {
          if(this.backtrack(i + 1)) {
            return true;
          }
        } else {
          variable.value[i] = null;
        }
      }
    }
   
    return false;
  }

  private forwardChecking(i: number, legal: any[][][]) {
    const isComplete = this.variables.every(v => v.value[0]);
    if(isComplete) {
      if(this.isSatisfied()) {
        // solution
        this.solutions.push(_.cloneDeep(this.variables));
        return false;
      }
      return false;
    }
    const id = this.getMostConstrainedVariable();
    const variable = this.variables[id];
    let domain = legal[id][0];
    for(let c = 0; c < domain.length; c++) {
      this.visitedNodes++;
      const value = domain[c];
      variable.value[0] = value;
      if(this.isSatisfied()) {
        const removedIllegal = this.removeIllegal(i + 1, _.cloneDeep(legal))
        if(this.forwardChecking(i + 1, removedIllegal)) {
          return true;
        } 
      } else {
        variable.value[0] = null;
      }
    }
    return false;
  }

  private removeIllegal(id: number, values: any[][][]) {
    for(let i = id; i < this.variables.length; i++) {
      const domain = values[i][0];
      const wasValue = this.variables[i].value[0];
      for(let d = 0; d < domain.length; d++) {
        this.variables[i].value[0] = domain[d];
        if(!this.isSatisfied()) {
          domain.splice(d, 1);
          d--;
        }
      }
      this.variables[i].value[0] = wasValue;
    }
    return values;
  }

  private getMostConstrainedVariable() {
    let fewest = -1;
    let fewestId = null;
    for(let i = 0; i < this.variables.length; i++) {
      if(!this.variables[i].value[0]) {
        const available = this.domains[i][0].length;
        if(fewest === -1) {
          fewest = available;
          fewestId = i;
        } else if(fewest > available) {
          fewest = available;
          fewestId = i;
        }
      }
    }
    return fewestId;
  }

  private getLessConstrainingValue(variableId: number, domains: any[][][]) {
    let valueId = -1;
    let mostAvailable = -1;
    const domain = domains[variableId][0];
    const remaining = this.variables.filter(v => !v.value[0]);
    if(domain.length) return false;
    for(let i = 0; i < domain.length; i++) {
      this.variables[variableId] = domain[i];
      const legal = this.removeIllegal(variableId, _.cloneDeep(domains));
      const allAvailable = legal.reduce((acc, l) => acc + (l[0].length), 0);
      if(allAvailable > mostAvailable) {
        mostAvailable = allAvailable;
        valueId = i;
      }
    }
    return valueId;
  }

  private isSatisfied() {
    const checkers = this.constraints.map(c => c());
    return !checkers.includes(false);
  }
 
}