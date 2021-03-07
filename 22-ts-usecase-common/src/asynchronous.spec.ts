import { fetchDataByCallback, fetchDataByPromise, fetchDataByPromiseRejected } from './asynchronous';
import { expect } from 'chai';

describe('asynchronous', () => {
  // Callback - Dont' do this!
  // MISSED done callback
  it('Wroing - the data is peanut butter', () => {
    function callback(data: string) {
      expect(data).to.equal('peanut butter');
    }
    fetchDataByCallback(callback);
  });

  // Callback - Do like this
  // SHOULD USE done callback
  it('Callback - the data is peanut butter', (done) => {
    function callback(data: string) {
      try {
        expect(data).to.equal('peanut butter');
        done();
      } catch (error) {
        done();
      }
    }
    fetchDataByCallback(callback);
  });

  // Promise (using .then)
  // SHOULD BE return
  it('Promise .then - the data is peanut butter', () => {
    return fetchDataByPromise().then((data: string) => {
      expect(data).to.equal('peanut butter');
    });
  });

  // Async/Await
  it('Async/Await = the data is peanut butter', async () => {
    const data = await fetchDataByPromise();
    expect(data).to.equal('peanut butter');
  });
});
