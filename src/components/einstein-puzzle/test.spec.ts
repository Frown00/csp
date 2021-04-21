import { expect } from 'chai';
import { log } from '../../util';
import { EinsteinPuzzle } from './EinsteinPuzzle';

describe('Mechanic', () => {
  describe('EinsteinPuzzle solve()', () => {
    it.only('should return one random weighted direction', function() {
      this.timeout(50000);
      // Given
      const width = 10;
      const height = 10;
      const nPoints = 10;
      // When
      const puzzle = new EinsteinPuzzle();
      puzzle.solve();
      // Then
      // log(map);
    });
  });
});