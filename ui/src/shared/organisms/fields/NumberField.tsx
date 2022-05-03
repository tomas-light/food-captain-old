import { useStyletron } from 'baseui';
import { Input } from 'baseui/input';
import { Label2 } from 'baseui/typography';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

type Props = {
	label: string;
	value: number;
	onChange: (value: number | null) => void;
};

function NumberField(props: Props) {
	const { label, value, onChange } = props;

	const [css] = useStyletron();

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				rowGap: '6px',
			})}
		>
			<Label2>{label}</Label2>
			<Input
				type={'number'}
				step={1}
				placeholder={label}
				value={value}
				onChange={(e) => {
					const _value = (e.target as HTMLInputElement).value;
					if (typeof _value === 'number') {
						onChange(_value);
					}
					try {
						const parsed = parseInt(_value, 10);
						if (isNaN(parsed)) {
							throw new Error('is NaN');
						}
						onChange(parsed);
					}
					catch (error) {
						onChange(null);
					}
				}}
			/>
		</div>
	);
}

export { NumberField };
export type { Props as NumberFieldProps };
