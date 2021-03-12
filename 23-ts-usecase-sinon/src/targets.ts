import request from 'request';

export function greet(name: string) {
  return `Hello, ${name}!`;
}

export const sum = function (a: number, b: number): number {
  return a + b;
};

export const mySubscriber = function (msg: string, data: string) {
  console.log(msg, data);
};

export const myExternalLibrary = {
  _doNetworkCall(httpParams: { url: string; dataType: string }) {
    // console.log('Simulating fetching stuff from the network: ', httpParams);
    return { result: 42 };
  },
  getJSON(url: string) {
    return this._doNetworkCall({ url: url, dataType: 'json' });
  },
};

export const getAlbumById = async (id: number) => {
  const requestUrl = `https://jsonplaceholder.typicode.com/albums/${id}/photos?_limit=3`;
  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(body));
    });
  });
};
