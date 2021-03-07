export function fetchDataByCallback(callback: (data: string) => void): void {
  const data = 'peanut butter';
  setTimeout(() => {
    callback(data);
  }, 2000);
}

export function fetchDataByPromise(): Promise<string> {
  const data = 'peanut butter';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export function fetchDataByPromiseRejected(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    }, 2000);
  });
}
