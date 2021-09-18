import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { withStyles } from '@shared/theme';

type Props = SvgIconProps;

const ChevronUp = (props: Props) => (
  <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.2384 4.29176L19.6941 12.3585C20.102 12.7476 20.102 13.3784 19.6941 13.7674L18.7079 14.7082C18.3008 15.0966 17.641 15.0974 17.2329 14.7099L10.5 8.31681L3.7671 14.7099C3.35903 15.0974 2.69921 15.0966 2.29209 14.7082L1.30586 13.7674C0.898046 13.3783 0.898046 12.7476 1.30586 12.3585L9.76158 4.29176C10.1694 3.90275 10.8306 3.90275 11.2384 4.29176Z"
    />
  </SvgIcon>
);

const componentWithStyles = withStyles({
  root: {
    width: 'auto',
  },
})(ChevronUp);
export { componentWithStyles as ChevronUp };
