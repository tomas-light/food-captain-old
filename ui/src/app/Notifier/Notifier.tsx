import { SnackbarKey } from 'notistack';

import { Notification } from './models';
import { useNotifications } from './utils';

interface NotifierProps {
	notifications: Notification[];
}

interface NotificationCallProps {
	removeSnackbar: (key: SnackbarKey) => void;
}

type Props = NotifierProps & NotificationCallProps;

const Notifier = (props: Props) => {
	const { notifications = [], removeSnackbar } = props;

	useNotifications(notifications, removeSnackbar);

	return null;
};

export { Notifier };
export type { NotifierProps, NotificationCallProps };
