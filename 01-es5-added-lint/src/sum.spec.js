var expect = require('chai').expect;

const sum = require('./sum');

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).to.equal(3);
});
