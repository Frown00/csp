import { expect } from 'chai';
import { log } from '../../util';
import * as mechanic from './mechanic';

describe('Mechanic', () => {
  describe('MapColoringProblem generate()', () => {
    it('should return one random weighted direction', () => {
      // Given
      const width = 10;
      const height = 10;
      const nPoints = 10;
      // When
      const map = new mechanic.ColoringProblem(width, height, nPoints);
      map.generate();
      map.solve();
      // Then
      // log(map);
    });
  });
});