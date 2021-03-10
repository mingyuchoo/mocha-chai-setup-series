import { expect } from 'chai';
import sinon from 'sinon';

describe('sinon.fake()', () => {
  describe('Creating a fake', () => {
    /**********************************
     * Create a fake Function with or without behavior.
     * The created Function has the same API as a sinon.spy.
     **********************************/
    it('create a basic fake, with no behavior', () => {
      const fake = sinon.fake();

      fake();
      // undefined

      expect(fake.callCount).to.be.equal(1);
      // 1
    });
  });
  describe('Fake with behavior', () => {
    /**********************************
     * Fake cannot change once created with behaviour.
     **********************************/
    it('create a fake that returns the text "foo"', () => {
      const fake = sinon.fake.returns('foo');

      expect(fake()).to.be.equal('foo');
      // faoo
      expect(fake.callCount).to.be.equal(1);
    });

    it('creates a fake that throws an Error', () => {
      const fake = sinon.fake.throws(new Error('not apple pie'));

      expect(fake).to.throw(Error);
      expect(fake.callCount).to.be.equal(1);
    });
  });

  describe('Instance properties', () => {
    /**********************************
     * Instance properties are the same as a sinon.spy.
     **********************************/
    it('.callback', () => {
      const fake = sinon.fake();
      const callback1 = function () {
        console.log('1');
      };
      const callback2 = function () {
        console.log('2');
      };

      fake(1, 2, 3, callback1);
      fake(1, 2, 3, callback2);

      expect(fake.getCall(1).callback).to.be.equal(callback2);
      // true

      expect(fake.lastCall.callback).to.be.equal(callback2);
      // true
    });
    it('.firstArg, .lastArg', () => {
      const fake = sinon.fake();
      const date1 = new Date();
      const date2 = new Date(Date.UTC(0, 0, 0, 0, 0, 0));

      fake(date1, 1, 2);
      fake(date2, 3, 4);

      expect(fake.getCall(0).firstArg).to.be.equal(date1);
      expect(fake.getCall(0).lastArg).to.be.equal(2);

      expect(fake.getCall(1).firstArg).to.be.equal(date2);
      expect(fake.getCall(1).lastArg).to.be.equal(4);
    });

    it('Adding the fake to the system under test', () => {
      const fake = sinon.fake.returns('42');
      sinon.replace(console, 'log', fake);

      console.log('apple pie');
      // 42
      sinon.restore();
    });
  });
});
