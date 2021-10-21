import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddCircleOutlineIcon, EditIcon, RemoveCircleIcon } from '@shared/reexport';

import { IconButton } from '@shared/molecules/buttons';

interface MenuButtonsProps {
	amount: number;
	areDeleting: boolean;
}

interface MenuButtonsCallProps {
	onAdd: () => void;
	onEdit: () => void;
	onRemove: () => void;
}

type Props = MenuButtonsProps & MenuButtonsCallProps;

const MenuButtons = (props: Props) => {
	const { amount, areDeleting, onAdd, onEdit, onRemove } = props;

	const { t } = useTranslation();

	return (
		<div>
			<IconButton
				title={t('Add new menu')}
				icon={<AddCircleOutlineIcon />}
				onClick={onAdd}
				state={{ loading: false }}
			/>

			{amount !== 1 ? null : (
				<IconButton
					title={t('Edit selected menu')}
					icon={<EditIcon />}
					onClick={onEdit}
					state={{
						loading: false,
						disabled: amount !== 1,
					}}
				/>
			)}

			{amount === 0 ? null : (
				<IconButton
					title={t('Remove selected menus')}
					icon={<RemoveCircleIcon />}
					onClick={onRemove}
					state={{
						loading: areDeleting,
						disabled: amount === 0,
					}}
				/>
			)}
		</div>
	);
};

export type { MenuButtonsProps, MenuButtonsCallProps };
export { MenuButtons };
