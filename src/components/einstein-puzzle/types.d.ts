import { Nationality, Color, Pet, Drink, Smoke } from "./EinsteinPuzzle";

export interface IAnswer {
  house: 1 | 2 | 3 | 4 | 5;
  color: Color;
  nationality: Nationality;
  drink: Drink,
  smoke: Smoke,
  pet: Pet
}