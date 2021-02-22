export type MakeOptional<TObject, TOptional extends keyof TObject> = Omit<TObject, TOptional> & {
  [optionalKey in TOptional]?: TObject[optionalKey];
};
