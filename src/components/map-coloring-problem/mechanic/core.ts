import {
  checkIntersection,
  colinearPointWithinSegment
} from 'line-intersect';
import { ILine, IRegion, Point } from '../types';

export function backtracking() {

}

export function isSamePoint(p1: Point, p2: Point) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

export function calcDistance(point1: Point, point2: Point) {
  return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}

export function findNearest(region: IRegion, regions: IRegion[]): IRegion {
  if(regions.length === 0) return null;
  let nearest = regions[0];
  let nearestDistance = calcDistance(region.point, nearest.point);
  for(let i = 0; i < regions.length; i++) {
    const distance = calcDistance(region.point, regions[i].point)
    if(distance < nearestDistance) {
      nearest = regions[i];
    }
  }
  return nearest;
}

function isValidNeighbour(region: IRegion, nearest: IRegion, lines: ILine[]) {
  for(let j = 0; j < lines.length; j++) {
    const near = { start: region.point, end: nearest.point };
    const intersection = checkIntersection(
      near.start[0], near.start[1], near.end[0], near.end[1], 
      lines[j].start[0], lines[j].start[1], lines[j].end[0], lines[j].end[1]
    );
    let isIntersect = false;
    if(intersection.type === "colinear") {
      const intersect = colinearPointWithinSegment(
        near.start[0], near.start[1],
        lines[j].start[0], lines[j].start[1], lines[j].end[0], lines[j].end[1]
      );
      isIntersect = intersect;
    } else if(intersection.type === 'intersecting') {
      // ignore if starting point or ending point intersect
      const isStartingIntersect = isSamePoint(near.start, [intersection.point.x, intersection.point.y]);
      const isEndingIntersect = isSamePoint(near.end, [intersection.point.x, intersection.point.y]);
      isIntersect = !isStartingIntersect;
      if(isIntersect)
        isIntersect = !isEndingIntersect;
    }
    if(isIntersect) {
      return false;
    }
  }
  return true;
}

export function findNeighbor(region: IRegion, available: IRegion[], lines: ILine[]): IRegion {
  while(available.length > 0) {
    const nearest = findNearest(region, available);
    const isValid = isValidNeighbour(region, nearest, lines);
    if(isValid)
      return nearest;
    const idx = available.indexOf(nearest);
    available.splice(idx, 1);
  }
  return null;
}