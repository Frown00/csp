import { expect } from 'chai';
import * as mechanic from './mechanic';

describe('Mechanic', () => {
  describe('MapColoringProblem generate()', () => {
    it('should return one random weighted direction', () => {
      // Given
      const width = 10;
      const height = 10;
      const nPoints = 5;
      // When
      const map = new mechanic.MapColoringProblem(width, height, nPoints);
      map.generate();
      // Then
      console.log(map);
    });
  });
});