import { Textarea } from 'baseui/textarea';

type Props = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

function TextAreaField(props: Props) {
  const { label, value, onChange } = props;

  return (
    <div>
      <label>{label}</label>
      <Textarea
        placeholder={label}
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}

export { TextAreaField };
export type { Props as TextAreaFieldProps };
