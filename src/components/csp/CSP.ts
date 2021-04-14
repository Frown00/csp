import _ from "lodash";
import { IVariable } from "./types";

type State<V> = { variable: IVariable<V>, domain: any[][] }[];

export class CSP<V> {
  private variables: IVariable<V>[]
  private constraints: (() => boolean)[]
  private domains: any[][]
  private solutions:  IVariable<V>[][]
  private state: State<V>

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

  addDomain<D>(domain: D[]) {
    this.domains.push(domain);
  }

  addConstraints(...constraints: (() => boolean)[]) {
    this.constraints.push(...constraints);
  }

  backtracing() {
    this.backtrace(0, 0);
    if(this.solutions.length <= 0) {
      return false;
    }
    return true;
  }

  private backtrace(i: number, d: number) {
    if(i === this.variables.length) {
      if(this.isSafe()) {
        // solution
        this.solutions.push(_.cloneDeep(this.variables));
        return false;
      }
      return false;
    }
    const variable = this.variables[i];
    const domain = this.domains[d];
    for(let v = 0; v < domain.length; v++) {
      variable.value[d] = domain[v];
      if(this.isSafe()) {
        if(d < this.domains.length - 1) {
          if(this.backtrace(i, d + 1)) {
            return true;
          } else {
            variable.value[d] = null;
          }
        } else {
          if(this.backtrace(i + 1, 0)) {
            return true;
          } else {
            variable.value[d] = null;
          }
        }
      }
    }
    return false;
  }

  private isSafe() {
    const checkers = this.constraints.map(c => c());
    return !checkers.includes(false);
  }
 
}