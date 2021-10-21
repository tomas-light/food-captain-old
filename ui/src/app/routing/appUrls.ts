export const appUrls = {
	root: '/',
	schedule: '/schedule',
	menu: '/menu',
	menuDetails: '/menu/:menuId',
	getMenuDetailsPath: (menuId: number) => `/menu/${menuId}`,
	dish: '/dish',
	user: '/user',
};
