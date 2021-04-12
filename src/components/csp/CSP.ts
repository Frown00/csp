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

  getSolutionsCount() {
    return this.solutions.length;
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

  backtracing() {
    this.backtrace(0);
    if(this.solutions.length <= 0) {
      return false;
    }
    return true;
  }

  private backtrace(i: number) {
    if(i === this.variables.length) {
      if(this.isSafe()) {
        // solution
        this.solutions.push(_.cloneDeep(this.variables));
        return false;
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