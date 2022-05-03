import { useStyletron } from 'baseui';
import { Textarea } from 'baseui/textarea';
import { Label2 } from 'baseui/typography';

type Props = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

function TextAreaField(props: Props) {
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
