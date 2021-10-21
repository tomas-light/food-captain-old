import { FieldOption } from '../types';

type SelectOption = {
	data: FieldOption;
};

export function filterOptions(option: SelectOption, searchText: string): boolean {
	if (!searchText) {
		return true;
	}

	const { data } = option;

	const tags = data.getSearchTags();
	if (tags.length) {
		return searchByTags(tags, searchText);
	}

	const value = data.getValue();
	if (value) {
		return searchByValue(value, searchText);
	}

	return false;
}

function searchByTags(tags: string[], searchText: string) {
	return tags.some((tag) => tag.indexOf(searchText) >= 0);
}

function searchByValue(value: any, searchText: string) {
	if (typeof value !== 'string' && !value.toString) {
		return false;
	}

	const stringValue = value.toString();
	return stringValue.indexOf(searchText) >= 0;
}
