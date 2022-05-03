import { useStyletron } from 'baseui';
import { Select } from 'baseui/select';
import { Label2 } from 'baseui/typography';
import { Option } from './Option';

type Props<TOption extends Option> = {
	label: string;
	value: TOption[];
	options: TOption[];
	onChange: (value: TOption[]) => void;
};

function MultiSelectField<TOption extends Option>(props: Props<TOption>) {
	const { label, value, options, onChange } = props;

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
			<Select
				options={options}
				labelKey="name"
				valueKey="id"
				multi
				onChange={({ value }) => onChange(Array.isArray(value) ? value[0] : null)}
				value={[value]}
			/>
		</div>
	);
}

export { MultiSelectField };
export type { Props as MultiSelectFieldProps };
