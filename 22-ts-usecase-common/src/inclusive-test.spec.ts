import { expect } from 'chai';

describe('inclusive', function () {
  describe.skip('test suite #1', function () {
    it.skip('test suite #1 - test case #1', function () {
      console.log('test suite #1 - test case #1');
    });
  });
  // 테스트하고자 하면 주석 해제하세요.
  describe('test suite #2', function () {
    it.skip('test case #1', function () {
      console.log('test case #1');
    });
    it('test case #2', function () {
      console.log('test case #2');
    });
    it('test case #3', function () {
      console.log('test case #3');
    });
  });
});
