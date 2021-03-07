import { expect } from 'chai';
import sinon from 'sinon';
import { greet } from './greet';

describe('greet.ts', () => {
  it('greeting of chris', () => {
    expect(greet('chris')).to.be.equal('Hello, chris!');
  });
});
