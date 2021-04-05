export type Point = [number, number];

export interface IRegion {
  point: Point,
  neighbors: IRegion[],
  color?: string,
}

export interface ILine { 
  start: Point, 
  end: Point 
}