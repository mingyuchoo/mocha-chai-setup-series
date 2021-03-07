import { expect } from 'chai';

describe('hooks', () => {
  before(() => {
    // runs once before the first test in this block
    console.log('before');
  });

  after(() => {
    // runs once after the last test in this block
    console.log('after');
  });

  beforeEach(() => {
    // runs before each test in this block
    console.log('beforeEach');
  });

  afterEach(() => {
    // runs after each test in this block
    console.log('beforeEach');
  });

  // test cases
  it('test case - 1', () => {
    console.log('test case - 1');
    expect(true).to.equal(true);
  });
  it('test case - 2', () => {
    console.log('test case - 2');
    expect(true).to.equal(true);
  });
});
