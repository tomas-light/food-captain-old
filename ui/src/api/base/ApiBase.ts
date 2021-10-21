import axios from 'axios';

import { BASE_API_URL } from '@env';
import { ApiResponse } from '@utils/api';
import { IndexedDb } from '../IndexedDb';

export abstract class ApiBase {
	static get<TData = any>(url: string): Promise<ApiResponse<TData>> {
		const requestUrl = this.makeUrl(url);
		return axios.get<TData>(requestUrl);
	}

	static post<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>> {
		const requestUrl = this.makeUrl(url);
		return axios.post<TData>(requestUrl, data);
	}

	static put<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>> {
		const requestUrl = this.makeUrl(url);
		return axios.put<TData>(requestUrl, data);
	}

	static patch<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>> {
		const requestUrl = this.makeUrl(url);
		return axios.patch<TData>(requestUrl, data);
	}

	static delete<TData = any>(url: string): Promise<ApiResponse<TData>> {
		const requestUrl = this.makeUrl(url);
		return axios.delete<TData>(requestUrl);
	}

	protected static async openDb() {
		const DB_NAME = 'food_captain';
		const db = new IndexedDb(DB_NAME);
		await db.createObjectStore(['menus', 'dishes', 'users']);

		return db;
	}

	private static makeUrl(url: string) {
		if (url.startsWith('http')) {
			return url;
		}

		return `${BASE_API_URL}${url}`;
	}
}
