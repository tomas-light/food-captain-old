import { Input } from 'baseui/input';

type Props = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

function TextField(props: Props) {
  const { label, value, onChange } = props;

  return (
    <div>
      <label>{label}</label>
      <Input
        placeholder={label}
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}

export { TextField };
export type { Props as TextFieldProps };
