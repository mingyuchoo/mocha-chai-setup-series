import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PubSub from 'pubsub-js';
chai.use(sinonChai);

describe('spy.mock()', () => {
  /*********************************************
   * Mocks and mock expectations are
   * fake methods (like spies)
   * with pre-programmed behavior (like stubs)
   * as well as pre-programmed expectations.
   *
   * A mock will fail your test
   * if it is not used as expected.
   *********************************************/
  it('should call all subscribers when exceptions', () => {
    const myAPI = {
      callback: () => {
        console.log('callback');
      },
    };
    const spy = sinon.spy();
    const mock = sinon.mock(myAPI);
    mock.expects('callback').once();

    PubSub.subscribe('message', myAPI.callback);
    PubSub.subscribe('message', spy);
    PubSub.publishSync('message', undefined);

    mock.verify();
    expect(spy).to.have.calledOnce;
  });
});
