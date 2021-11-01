import { AppNavBar, NavItemT, setItemActive } from 'baseui/app-nav-bar';
import { Overflow } from 'baseui/icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { appUrls, RouterController } from '~app/routing';

type NavItem = NavItemT & {
	url: string;
};

const typedSetActiveItem = (items: NavItem[], item: NavItem) => {
	const result = setItemActive(items, item);
	return result as NavItem[];
};

const Navbar = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const currentUser = useSelector(state => state.user.currentUser);

	const [mainItems, setMainItems] = useState<NavItem[]>([
		{ icon: Overflow, url: appUrls.menu, label: t('menu.many') },
		{ icon: Overflow, url: appUrls.dish, label: t('dish.many'), active: true },
		{ icon: Overflow, url: appUrls.ingredient, label: t('ingredient.many') },
		// {
		// 	active: true,
		// 	icon: ChevronDown,
		// 	label: "Main B",
		// 	navExitIcon: Delete,
		// 	children: [
		// 		{ icon: Upload, label: "Secondary A" },
		// 		{ icon: Upload, label: "Secondary B" }
		// 	]
		// }
	]);

	return (
		<AppNavBar
			title="Food captain"
			mainItems={mainItems}
			onMainItemSelect={(item: NavItem) => {
				redirect(item.url)
				setMainItems(prev => typedSetActiveItem(prev, item));
			}}
			username={currentUser?.name ?? 'loading...'}
			usernameSubtitle={currentUser?.email ?? 'loading...'}
			userItems={[
				{ icon: Overflow, label: currentUser?.name ?? 'loading...' },
			]}
			onUserItemSelect={item => console.log(item)}
		/>
	);
};

export { Navbar };
