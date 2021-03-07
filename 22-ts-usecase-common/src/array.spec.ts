import assert from 'assert';
import { expect } from 'chai';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});
