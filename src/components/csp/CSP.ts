import _ from "lodash";
import { IVariable } from "./types";

type State<V, D> = { variable: IVariable<V,D>, domain: D[] }[];

export class CSP<V, D> {
  private variables: IVariable<V, D>[]
  private constraints: (() => boolean)[]
  private domains: D[][]
  private solutions:  IVariable<V, D>[][]
  private state: State<V, D>

  constructor() {
    this.variables = [];
    this.domains = [];
    this.constraints = [];
    this.solutions = [];
    this.state = [];
  }

  getFirstSolution() {
    if(this.solutions.length > 0)
      return this.solutions[0];
    return null;
  }

  addVariable(variable: { id: V, value: D }, domain: D[]) {
    this.variables.push(variable);
    this.domains.push(domain);
    this.state.push({ 
      variable: _.cloneDeep(variable), 
      domain: _.cloneDeep(domain) 
    });
  }

  addConstraint(constraint: () => boolean) {
    this.constraints.push(constraint);
  }

  // backtracing() {
  //   for(let i = 0; i < this.state.length; i++) {
  //     const domain = this.state[i].domain;
  //     const variable = this.variables[i];
  //     if(domain.length <= 0) {
  //       // go back
  //     }
  //     variable.value = domain[0];
  //     let d = 1;
  //     while(this.isBreak()) {
  //       variable.value = domain[d];
  //       d++;
  //       if(d > domain.length) break;
  //     }
  //     if(d > domain.length) {
  //       variable.value = null;
  //       const last = this.state[this.state.length - 1];

  //       // go back
  //     } else {
  //       this.state[i].variable.value = variable.value;
  //       const removeIdx = domain.indexOf(variable.value);
  //       domain.splice(removeIdx, 1);
  //     }
  //   }
  //   console.log(this.variables);
  //   console.log(this.isBreak());
  // }

  backtracing() {
    if(!this.backtrace(0)) {
      console.log('No solution')
      return false;
    }
    console.log('Solution');
    console.log(this.variables);
    this.solutions.push(_.cloneDeep(this.variables));
  }

  private backtrace(i: number) {
    if(i === this.variables.length) {
      if(this.isSafe()) {
        // solution
        return true;
      }
      return false;
    }
    for(let c = 0; c < this.domains[i].length; c++) {
      this.variables[i].value = this.domains[i][c];
      if(this.isSafe()) {
        if(this.backtrace(i + 1))
          return true;
      } else {
        this.variables[i].value = null;
      }
    }
    return false;
  }

  private isSafe() {
    const checkers = this.constraints.map(c => c());
    return !checkers.includes(false);
  }
 
}