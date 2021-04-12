import { IAnswer } from "./types";

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
  NO_FILTER = 'cigaretter without a filter',
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

  constructor() {
  }

  allDifferent(domain: any[]) {
    //
  }

  solve() {
    const houses = [1, 2, 3, 4, 5];
    const nationality = Object.values(Nationality);
    const color = Object.values(Color);
    const smoke = Object.values(Smoke);
    const drink = Object.values(Drink);
    const pet = Object.values(Pet);
    const constraints = [
      this.allDifferent(nationality),
      this.allDifferent(color),
      this.allDifferent(smoke),
      this.allDifferent(drink),
      this.allDifferent(pet),
      {
        house: 1,
        nationality: Nationality.NORWEGIAN
      },
      {
        color: Color.RED,
        nationality: Nationality.ENGLISH
      },
      {
        color: Color.GREEN,
        leftFrom: Color.WHITE
      },
      {
        nationality: Nationality.DANE,
        drink: Drink.TEA
      },
      {
        smoke: Smoke.LIGHT,
        nearBy: Pet.CAT
      },
      {
        color: Color.YELLOW,
        smoke: Smoke.CIGAR
      },
      {
        nationality: Nationality.GERMAN,
        smoke: Smoke.PIPE
      },
      {
        house: 3,
        drink: Drink.MILK
      },
      {
        smoke: Smoke.LIGHT,
        nearBy: Drink.WATER
      },
      {
        smoke: Smoke.NO_FILTER,
        pet: Pet.BIRD
      },
      {
        nationality: Nationality.SWEDE,
        pet: Pet.DOG
      },
      {
        nationality: Nationality.NORWEGIAN,
        nearBy: Color.BLUE
      },
      {
        pet: Pet.HORSE,
        nearBy: Color.YELLOW
      },
      {
        smoke: Smoke.MENTHOL,
        drink: Drink.BEER
      },
      {
        color: Color.GREEN,
        drink: Drink.COFFEE
      }
    ];
    const answers: IAnswer[] = [];

    // backtracing
  }
}
