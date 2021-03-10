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
