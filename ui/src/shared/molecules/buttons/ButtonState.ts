type State = 'loading' | 'disabled' | 'pristine';

type ButtonState = Partial<Record<State, boolean>>;

export type { State, ButtonState };
