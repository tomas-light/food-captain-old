import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { withStyles } from '@shared/theme';

type Props = SvgIconProps;

const FileImage = (props: Props) => (
  <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20">
    <path
      d="M16 5.81066V6H12V2H12.1893C12.3882 2 12.579 2.07901 12.7197 2.21966L15.7803 5.28031C15.921 5.42097 16 5.61174 16 5.81066ZM11.75 7C11.3375 7 11 6.6625 11 6.25V2H4.75C4.33578 2 4 2.33578 4 2.75V17.25C4 17.6642 4.33578 18 4.75 18H15.25C15.6642 18 16 17.6642 16 17.25V7H11.75ZM7.51703 7.5C8.34547 7.5 9.01703 8.17156 9.01703 9C9.01703 9.82844 8.34547 10.5 7.51703 10.5C6.68859 10.5 6.01703 9.82844 6.01703 9C6.01703 8.17156 6.68862 7.5 7.51703 7.5ZM14.017 15H6.01703L6.03219 13.4848L7.26703 12.25C7.41347 12.1036 7.63575 12.1187 7.78219 12.2652L9.01703 13.5L12.2519 10.2652C12.3983 10.1187 12.6357 10.1187 12.7822 10.2652L14.017 11.5V15Z"
    />
  </SvgIcon>
);

const componentWithStyles = withStyles({
  root: {
    width: 'auto',
  },
})(FileImage);
export { componentWithStyles as FileImage };
