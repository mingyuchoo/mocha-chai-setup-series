/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PubSub from 'pubsub-js';
import bluebird from 'bluebird';
import jQuery from 'jquery';

chai.use(sinonChai);

describe('sinon.stub()', () => {
  /************************************
   * Test stubs are functions (spies)
   * with pre-programmed behavior.
   *
   * the full test spy API + the stub's behavior
   *
   * 1) Force a methods to run with specific behavior
   * 2) Prevent to run of some methods
   * ************************************/
  describe('Create an anonymouse stub function', () => {
    it('should behave differently based on arguments', () => {
      const stub = sinon.stub();

      // make to run with specific behavior
      stub.withArgs(42).returns(1);
      stub.withArgs(1).throws('name');

      expect(stub()).to.be.undefined; // no return value, no exception

      expect(stub(42)).to.equal(1);

      expect(stub.withArgs(42)).to.have.callCount(1); // sinon-chai style
      expect(stub.withArgs(42)).to.have.been.calledOnceWith(42); // sinon-chai style
      expect(stub.withArgs(42).callCount).to.be.equal(1); // chai style

      // throw exception
      expect(() => {
        stub(1);
      }).to.throw(Error);

      stub.resetBehavior(); // reset
    });
    it('shoudl behave differently on consecutive calls with certain argument', () => {
      const stub = sinon.stub();
      stub.withArgs(42).onFirstCall().returns(1).onSecondCall().returns(2);
      stub.returns(0);

      expect(stub(1)).to.be.equal(0); // .returns(0)
      expect(stub(42)).to.be.equal(1); // .withArgs(42).onFirstCall().returns(1)
      expect(stub(1)).to.be.equal(0); // .returns(0)
      expect(stub(42)).to.be.equal(2); // .withArgs(42).onSecondCall().returns(2)
      expect(stub(1)).to.be.equal(0); // .returns(0)
      expect(stub(42)).to.be.equal(0); // .returns(0)

      stub.resetBehavior(); // reset
    });
    it('should call all subscribers, even if there are exceptions', () => {
      const message = 'an example message';
      const stub = sinon.stub().throws();
      const spy1 = sinon.spy();
      const spy2 = sinon.spy();
      const clock = sinon.useFakeTimers();

      PubSub.subscribe(message, stub);
      PubSub.subscribe(message, spy1);
      PubSub.subscribe(message, spy2);

      expect(() => {
        PubSub.publishSync(message, 'some data');
        clock.tick(1);
      }).to.throw();
      expect(spy1).to.have.called; // sinon-chai style
      expect(spy2).to.have.called; // sinon-chai style
      expect(stub).to.have.calledBefore(spy1); // sinon-chai style
      expect(stub.calledBefore(spy1)).to.be.true; // chi style

      stub.resetBehavior(); // reset
    });
    it('shoudl reset history', () => {
      const stub = sinon.stub();
      expect(stub).to.not.have.called;

      stub();
      expect(stub).to.have.called;

      stub.resetHistory(); // reset history
      expect(stub).to.not.have.called;
    });
  });
  describe('Replaces object.method with a stub function', () => {
    // target object
    const myObj = {
      prop: () => {
        return 'foo';
      },
      sum: (a: number, b: number) => {
        return a + b;
      },
    };

    it('should call fake object.method', () => {
      sinon.stub(myObj, 'prop').callsFake(() => {
        return 'bar';
      });

      expect(myObj.prop()).to.be.equal('bar');
    });
    it('should call through', () => {
      sinon
        .stub(myObj, 'sum')
        .callThrough() // <-- added because myObj.sum.callThrough() is not work.
        .withArgs(2, 2)
        .callsFake(() => {
          return 999999;
        });
      // myObj.sum.callThrough(); // NOT work

      expect(myObj.sum(2, 2)).to.be.equal(999999);
      expect(myObj.sum(1, 2)).to.be.equal(3);
    });
    it('should resolve using specific Promise library', () => {
      const myObj = {
        save: sinon.stub().usingPromise(bluebird.Promise).resolves('baz'),
      };
      myObj.save().tap(function (actual: any) {
        expect(actual, 'baz');
      });
    });
  });
  describe('Stubs all the object', () => {
    it('should call specified callback', () => {
      let actual = '';
      const stub = sinon.stub();
      stub({
        success() {
          actual = 'Success!';
        },
        failure() {
          actual = 'Oh noes!';
        },
      });
      stub.yieldTo('failure');

      expect(actual).to.be.equal('Oh noes!');
    });
    it('calling the last callback', () => {
      const stub = sinon.stub();
      stub(
        () => {
          console.log('Success!');
        },
        () => {
          console.log('Oh noes!');
        }
      );
      stub.callArg(0);
      stub.callArg(1);
    });
  });
});
