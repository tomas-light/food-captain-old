import { FieldBaseProps } from '@shared/organisms/fields/FieldBase';
import React from 'react';
import { components } from 'react-select';
import { ContainerProps } from 'react-select/src/components/containers';

import { FieldOption } from '../../types';

interface DefaultSelectContainerProps {
	selectProps?: FieldBaseProps;
}

type Props = DefaultSelectContainerProps & ContainerProps<FieldOption, boolean>;

const DefaultSelectContainer = (props: Props) => {
	const {
		selectProps: { classes = {} },
	} = props;

	return <components.SelectContainer {...props} className={classes?.root?.root} />;
};

export { DefaultSelectContainer };
export type { DefaultSelectContainerProps };
