// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Array<T> {
  forEachAsync: (callback: (value: T) => Promise<void>) => Promise<void>;
}

Array.prototype.forEachAsync = function forEachAsync(callback: (value: any) => Promise<void>) {
  const generator = this.values();
  let i = 1;
  const { length } = this;

  return new Promise<void>(resolve => {
    const taskComplete = () => {
      if (i++ >= length) {
        resolve();
      }
    };

    let iterator: IteratorResult<any>;
    do {
      iterator = generator.next();
      if (!iterator.done) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        callback(iterator.value).then(() => {
          taskComplete();
        });
      }
    }
    while (!iterator.done);
  });
};
