import { EditMenuFormValues } from '@app/menu/EditMenuPage/models';
import { Menu } from '@models';

export interface SelectMenuActionPayload {
	selectedMenus: Menu[];
}

export interface LoadMenuActionPayload {
	menuId: number;
}

export interface SaveActionPayload {
	formValues: EditMenuFormValues;
}
