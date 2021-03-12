/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PubSub from 'pubsub-js';

import { getAlbumById } from './targets';
import request from 'request';

chai.use(sinonChai);

describe('spy.mock()', () => {
  it('should call all subscribers when exceptions', () => {
    const myAPI = {
      mySubscriber: () => {
        console.log('mySubscriber is executed.');
      },
    };
    const mockedMyAPI = sinon.mock(myAPI);
    const spiedFn = sinon.spy();

    mockedMyAPI.expects('mySubscriber').once();

    PubSub.subscribe('message', myAPI.mySubscriber);
    PubSub.subscribe('message', spiedFn);
    PubSub.publishSync('message', undefined);

    mockedMyAPI.verify();

    expect(spiedFn.calledOnce).to.be.true;

    mockedMyAPI.restore();
  });

  it('should getPhotosByAlbumId', (done) => {
    const mockedRequest = sinon.mock(request);

    type Photo = {
      albumId: number;
      id: number;
      title: string;
      url: string;
      thumbnailUrl: string;
    };
    const myPhotos: Array<Photo> = [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
      },
      {
        albumId: 1,
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
      },
    ];

    mockedRequest
      .expects('get')
      .once()
      .withArgs('https://jsonplaceholder.typicode.com/albums/2/photos?_limit=3')
      .yields(null, null, JSON.stringify(myPhotos));

    void getAlbumById(2).then((photos: any) => {
      expect(photos.length).to.equal(3);
      photos.forEach((photo: any) => {
        expect(photo).to.have.property('id');
        expect(photo).to.have.property('title');
        expect(photo).to.have.property('url');
      });

      mockedRequest.verify();
      mockedRequest.restore();
      done();
    });
  });
});
