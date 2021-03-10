import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PubSub from 'pubsub-js';

import { sum, mySubscriber, myExternalLibrary } from './targets';

chai.use(sinonChai);

describe('sinon.spy()', () => {
  /**************************************
   * A test spy is a function that
   * records arguments, return values,
   * the value of `this`and exception throw
   * if any for all its calls
   **************************************/

  describe('Anonymous function', () => {
    it('Creating a spy as an anonymous function very simple', () => {
      const spy = sinon.spy();

      expect(spy.called).to.be.false; // chai style
      expect(spy).to.not.have.been.called; // sinon-chai style

      spy(); // call spy

      expect(spy.called).to.be.true; // chai style
      expect(spy).to.have.been.called; // sinon-chai style
    });

    it('Creating a spy as an anonymous function with PubSub', () => {
      const spy = sinon.spy();

      const token = PubSub.subscribe('MY TOPIC', spy);
      PubSub.publishSync('MY TOPIC', 'hello world!');
      PubSub.unsubscribe(token);

      expect(spy.called).to.be.true; // chai style
      expect(spy).to.have.been.called; // sinon-chai style
    });
  });

  describe('Named Function', () => {
    it('Creating a spy as a specific function', () => {
      const spy = sinon.spy(sum);

      expect(spy.called).to.be.false; // chai style
      expect(spy).to.not.have.been.called; // sinon-chai style

      const ret = spy(1, 2); // call spyed `sum` function
      // console.log(`sum(1, 2) = ${ret}`);

      expect(spy.called).to.be.true; // chai style
      expect(spy).to.have.been.called; // sinon-chai style
    });
  });

  describe('Wrap a specific method of an object', () => {
    it('Using a spy to wrap just one method', () => {
      class Employee {
        private _fullName = '';
        fullName(newName: string) {
          this._fullName = newName;
        }
      }
      const employee = new Employee();
      const spy = sinon.spy(employee, 'fullName');
      employee.fullName('Tom');
      //expect(spy.set.calledOnce).to.be.true; // chai style
      expect(spy).to.have.calledOnce; // sinon-chai style
    });
  });

  describe('Wrap an Object', () => {
    it('Using a spy to wrap all object method', () => {
      const sandbox = sinon.createSandbox();
      sandbox.spy(myExternalLibrary);

      const url = 'https://jsonplaceholder.typicode.com/todos/1';
      myExternalLibrary.getJSON(url);

      //expect(myExternalLibrary.getJSON.calledOnce).to.be.true; // this is NOT working.
      expect(myExternalLibrary.getJSON).have.been.calledOnce;
    });
  });
});
