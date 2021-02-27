// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Array<T> {
  forEachAsync: (callback: (value: T) => Promise<void>) => Promise<void>;
}
