import { expect } from 'chai';

import { add } from './dynamically-generating-test';

describe('dynamically-generating', () => {
  describe('add()', function () {
    const tests = [
      { args: [1, 2], expected: 3 },
      { args: [1, 2, 3], expected: 6 },
      { args: [1, 2, 3, 4], expected: 10 },
    ];

    tests.forEach(({ args, expected }) => {
      it(`correctly adds ${args.length} args`, function () {
        const res: number = add(args);
        expect(res).to.be.equal(expected);
      });
    });
  });
});
