import { CSP } from "../csp/CSP";
import { IVariable } from "../csp/types";
import { IAnswer } from "./types";
import _ from "lodash";

export enum Nationality {
  NORWEGIAN = 'norwegian',
  ENGLISH = 'english',
  DANE = 'dane',
  GERMAN = 'german',
  SWEDE = 'swede'
}

export enum Color {
  GREEN = 'green',
  WHITE = 'white',
  YELLOW = 'yellow',
  BLUE = 'blue',
  RED = 'red'
}

export enum Smoke {
  LIGHT = 'cigarette light',
  NO_FILTER = 'cigarette without a filter',
  MENTHOL = 'menthol cigarette',
  CIGAR = 'cigar',
  PIPE = 'pipe'
}

export enum Drink {
  TEA = 'tea',
  MILK = 'milk',
  WATER = 'water',
  COFFEE = 'coffee',
  BEER = 'beer'
}

export enum Pet {
  BIRD = 'bird',
  DOG = 'dog',
  HORSE = 'horse',
  CAT = 'cat',
  FISH = 'fish'
}

export class EinsteinPuzzle {
  private variables: IVariable<number>[];

  constructor() {
    this.variables = [
      { id: 1, value: [null, null, null, null, null, null] },
      { id: 2, value: [null, null, null, null, null, null] },
      { id: 3, value: [null, null, null, null, null, null] },
      { id: 4, value: [null, null, null, null, null, null] },
      { id: 5, value: [null, null, null, null, null, null] }
    ]
  }

  isAllDifferent() {
    const values = _.flatten(this.variables.map(v => v.value)).filter(v => v !== null);
    const unique = _.uniq(values);
    return values.length === (unique.length);
  }

  constraint(coded: string) {
    const values = _.flatten(this.variables.map(v => v.value));
    for(let i = 0; coded.length; i++) {
      const v = coded[i];
      if(v != 'x') {

      }
    }
  }
  oneValueBoundAnother(
    value: any, 
    another: any
  ) {
    const variable = this.variables
      .find(variable => variable.value
        .find(v => v === value)
      );
    if(!variable) return true;
    // console.log(value, variable, variable.value.includes(another));
    return variable.value.includes(another);
  }

  solve() {
    const houses = [1, 2, 3, 4, 5];
    const nationality = Object.values(Nationality);
    const color = Object.values(Color);
    const smoke = Object.values(Smoke);
    const drink = Object.values(Drink);
    const pet = Object.values(Pet);
    const domains = [houses, nationality, color, smoke, drink, pet];
    const csp = new CSP<number>();    
    
    for(let i = 0; i < this.variables.length; i++) {
      csp.addVariable(this.variables[i]);
      for(let d = 0; d < domains.length; d++) {
        csp.addDomain(i, domains[d]);
      }
    }
    csp.addConstraints(
      () => this.isAllDifferent(),
      // () => this.oneValueBoundAnother(1, Nationality.NORWEGIAN),
      // () => this.oneValueBoundAnother(Color.RED, Nationality.ENGLISH),
      // () => valueBoundOnLeft(GREEN, WHITE)
      // () => this.oneValueBoundAnother(Nationality.DANE, Drink.TEA),
      // () => this.oneValueBoundAnother(Nationality.DANE, Drink.TEA),
      // () => this.oneValueBoundAnother(Nationality.DANE, Drink.TEA),
      // () => 
      
    );
    csp.backtracking();
    console.log(csp.getFirstSolution());
    // const constraints = [
    //   this.allDifferent(nationality),
    //   this.allDifferent(color),
    //   this.allDifferent(smoke),
    //   this.allDifferent(drink),
    //   this.allDifferent(pet),
    //   {
    //     house: 1,
    //     nationality: Nationality.NORWEGIAN
    //   },
    //   {
    //     color: Color.RED,
    //     nationality: Nationality.ENGLISH
    //   },
    //   {
    //     color: Color.GREEN,
    //     leftFrom: Color.WHITE
    //   },
    //   {
    //     nationality: Nationality.DANE,
    //     drink: Drink.TEA
    //   },
    //   {
    //     smoke: Smoke.LIGHT,
    //     nearBy: Pet.CAT
    //   },
    //   {
    //     color: Color.YELLOW,
    //     smoke: Smoke.CIGAR
    //   },
    //   {
    //     nationality: Nationality.GERMAN,
    //     smoke: Smoke.PIPE
    //   },
    //   {
    //     house: 3,
    //     drink: Drink.MILK
    //   },
    //   {
    //     smoke: Smoke.LIGHT,
    //     nearBy: Drink.WATER
    //   },
    //   {
    //     smoke: Smoke.NO_FILTER,
    //     pet: Pet.BIRD
    //   },
    //   {
    //     nationality: Nationality.SWEDE,
    //     pet: Pet.DOG
    //   },
    //   {
    //     nationality: Nationality.NORWEGIAN,
    //     nearBy: Color.BLUE
    //   },
    //   {
    //     pet: Pet.HORSE,
    //     nearBy: Color.YELLOW
    //   },
    //   {
    //     smoke: Smoke.MENTHOL,
    //     drink: Drink.BEER
    //   },
    //   {
    //     color: Color.GREEN,
    //     drink: Drink.COFFEE
    //   }
    // ];
    const answers: IAnswer[] = [];

    // backtracing
  }
}
