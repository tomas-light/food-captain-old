import { useStyletron } from 'baseui';
import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Notification } from './Notification';

const Notifier = () => {
	const [css] = useStyletron();
	const { notifications } = useSelector((state) => state.notifier);

	if (!notifications.length) {
		return null;
	}

	return (
		<div
			className={css({
				position: 'absolute',
				bottom: '16px',
				right: '16px',
				display: 'flex',
				flexDirection: 'column',
				gap: '16px'
			})}
		>
			{notifications.map((notification) => (
				<p
					key={notification.key}
					className={css({
						...makeStyles(notification.variant),
					})}
				>
					{notification.message}
				</p>
			))}
		</div>
	);
};

function makeStyles(notificationVariant: Notification['variant']): CSSProperties {
	switch (notificationVariant) {
		case 'success':
			return {
				color: 'green',
			};

		case 'warning':
			return {
				color: 'orange',
			};

		case 'error':
			return {
				color: 'red',
			};

		case 'info':
		default:
			return {
				color: 'black',
			};
	}
}

export { Notifier };
