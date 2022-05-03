import { AppNavBar, NavItemT, setItemActive } from 'baseui/app-nav-bar';
import { Overflow } from 'baseui/icon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { appUrls, RouterController } from '~app/routing';

type NavItem = NavItemT & {
	url: string;
};

const activateItem = (item: NavItem) => {
	return (state: NavItem[]) => {
		const result = setItemActive(state, item);
		return result as NavItem[];
	}
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

	useEffect(() => {
		const currentItem = mainItems.find(item => location.pathname.startsWith(item.url));
		if (currentItem) {
			setMainItems(activateItem(currentItem));
		} else {
			const menuItem = mainItems.find(item => item.url === appUrls.menu);
			if (menuItem) {
				setMainItems(activateItem(menuItem));
			}
		}
	}, [location]);

	return (
		<AppNavBar
			title="Food captain"
			mainItems={mainItems}
			onMainItemSelect={(item: NavItem) => {
				redirect(item.url)
				setMainItems(activateItem(item));
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
