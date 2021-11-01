import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './resources/ru.json';

export function configureTranslation() {
	i18n
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			lng: 'ru',
			fallbackLng: 'ru',
			resources: {
				ru: {
					translation: ru,
				},
			},

			interpolation: {
				escapeValue: false, // react already safes from xss
			},
		});
}
