import { useStyletron } from 'baseui';
import { Input } from 'baseui/input';
import { Label2 } from 'baseui/typography';

type Props = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

function TextField(props: Props) {
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
			<Input placeholder={label} value={value} onChange={(e) => onChange((e.target as HTMLInputElement).value)} />
		</div>
	);
}

export { TextField };
export type { Props as TextFieldProps };
