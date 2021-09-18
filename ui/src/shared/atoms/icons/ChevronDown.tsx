import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { withStyles } from '@shared/theme';

type Props = SvgIconProps;

const ChevronDown = (props: Props) => (
  <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20" fill="none">
    <path
      d="M8.76162 15.7082L0.305861 7.64145C-0.101954 7.2524 -0.101954 6.62165 0.305861 6.23264L1.29209 5.29178C1.69921 4.90339 2.35903 4.90264 2.7671 5.29012L9.50002 11.6832L16.2329 5.29012C16.641 4.90264 17.3008 4.90339 17.7079 5.29178L18.6941 6.23264C19.102 6.62169 19.102 7.25244 18.6941 7.64145L10.2384 15.7082C9.83061 16.0973 9.16944 16.0973 8.76162 15.7082Z"
    />
  </SvgIcon>
);

const componentWithStyles = withStyles({
  root: {
    width: 'auto',
  },
})(ChevronDown);
export { componentWithStyles as ChevronDown };
