import { State } from '~State';

declare module 'react-redux' {
	function useSelector<Selected>(
		expression: (state: State) => Selected,
		equalityFn?: (left: Selected, right: Selected) => boolean
	): Selected;
}
