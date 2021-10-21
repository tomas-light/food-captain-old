import { Components } from '@shared/reexport';

import { ThemeColors } from '../models';
import { overrideButton } from './overrideButton';
import { overrideCheckbox } from './overrideCheckbox';
import { overrideDialog } from './overrideDialog';
import { overrideForm } from './overrideForm';
import { overrideInput } from './overrideInput';
import { overrideMenu } from './overrideMenu';
import { overrideRadio } from './overrideRadio';
import { overrideTab } from './overrideTab';
import { overrideTable } from './overrideTable';
import { overrideTooltip } from './overrideTooltip';

export function overrideMaterialUIComponents(colors: ThemeColors): Components {
	return {
		...overrideButton(colors),
		...overrideCheckbox(colors),
		...overrideDialog(),
		...overrideForm(colors),
		...overrideInput(colors),
		...overrideMenu(colors),
		...overrideRadio(colors),
		...overrideTab(colors),
		...overrideTable(),
		...overrideTooltip(),
	};
}
