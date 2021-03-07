import { expect } from 'chai';

describe('synchronous', () => {
  describe('Array', () => {
    it('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(0)).to.equal(-1);
      expect([1, 2, 3].indexOf(5)).to.equal(-1);
    });
    it('should return 0 when the 1 is present', () => {
      expect([1, 2, 3].indexOf(1)).to.equal(0);
    });
  });
});
