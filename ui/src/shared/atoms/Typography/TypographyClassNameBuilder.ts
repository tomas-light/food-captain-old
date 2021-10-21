import clsx from 'clsx';

import { ClassNameMap } from '@utils/types';
import { TypographyColorVariant } from './TypographyColorVariant';
import { useTypographyColorStyles } from './useTypographyColorStyles';
import { TextSizeVariant, useTextSizeStyles } from '../Text';
import { TypographyClassNameKeys, useTypographyStyles } from './useTypographyStyles';

export class TypographyClassNameBuilder {
	private readonly classes: ClassNameMap<TypographyClassNameKeys>;
	private readonly colorClasses: ClassNameMap<TypographyColorVariant>;
	private readonly sizeClasses: ClassNameMap<TextSizeVariant>;
	private readonly externalClassName?: string;

	private className: string;

	constructor(className?: string) {
		this.classes = useTypographyStyles();
		this.colorClasses = useTypographyColorStyles();
		this.sizeClasses = useTextSizeStyles();
		this.externalClassName = className;

		this.className = this.classes.root;
	}

	public appendColor(disabled: boolean, color: TypographyColorVariant): TypographyClassNameBuilder {
		if (disabled) {
			this.className = clsx(this.className, this.colorClasses.disabled);
		} else {
			this.className = clsx(this.className, this.colorClasses[color]);
		}
		return this;
	}

	public appendSize(size: TextSizeVariant): TypographyClassNameBuilder {
		this.className = clsx(this.className, this.sizeClasses[size]);
		return this;
	}

	public appendNoWrap(noWrap: boolean): TypographyClassNameBuilder {
		if (noWrap) {
			this.className = clsx(this.className, this.classes.noWrap);
		}
		return this;
	}

	public appendBold(bold: boolean): TypographyClassNameBuilder {
		if (bold) {
			this.className = clsx(this.className, this.classes.noWrap);
		}
		return this;
	}

	public build(): string {
		return clsx(this.className, this.externalClassName);
	}
}
