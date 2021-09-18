import React, { useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@shared/theme';

import { FileImageIcon } from '@shared/atoms/icons';
import {
  DragAndDrop as DragAndDropAtom,
  DragAndDropClassKey,
  DragAndDropCallProps,
  DragAndDropProps
} from '@shared/atoms';
import { guid } from '@utils';
import { useTranslation } from 'react-i18next';
import { FieldBase, FieldBaseProps } from './FieldBase';

const DragAndDrop = withStyles<DragAndDropClassKey>((theme) => ({
  root: {
    boxSizing: 'border-box',
    height: 48,
    padding: '12px 16px',
    width: '100%',
    position: 'relative',

    display: 'grid',
    gridGap: 10,
    gridAutoFlow: 'column',
    gridTemplateColumns: '24px auto',
    alignItems: 'center',

    backgroundColor: '#F3F3F5',
    color: '#757575',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#F3F3F5',
    borderRadius: theme.borderRadius,

    '&:hover': {
      backgroundColor: '#e0e0e0',
      borderColor: '#e0e0e0',
      cursor: 'pointer',
    },

    '& > p': {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '19px',
      fontVariant: 'small-caps',
    },
  },
  idle: {},
  error: {
    backgroundColor: '#FBEFEE',
    borderColor: '#ECACA5',
  },
  dragging: {
    backgroundColor: '#F0FAF3',
    borderColor: '#9EE2B8',
  },
}))(DragAndDropAtom);

const useStyles = makeStyles({
  progress: {
    color: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: '50%',
    marginTop: -12,
    right: 16,
  },
}, { name: 'DragAndDropField' });

interface DragAndDropFieldProps extends FieldBaseProps<DragAndDropClassKey>,
  DragAndDropProps {

  innerText?: string;
  isLoading?: boolean;
}

type Props = DragAndDropFieldProps & DragAndDropCallProps;

const DragAndDropField = (props: Props) => {
  const { t } = useTranslation();

  const {
    id = guid(),
    name,
    innerText = t('drag or click'),
    isLoading = false,
    fileTypes,
    onDrop,
    ...rest
  } = props;

  const classes = useStyles();
  const [fileName, setFileName] = useState<string>('');

  const handleOnDrop = (files: FileList) => {
    setFileName(files.item(0).name);
    onDrop(files);
  };

  return (
    <FieldBase
      htmlFor={id}
      {...rest}
    >
      <DragAndDrop
        id={id}
        name={name}
        onDrop={handleOnDrop}
        error={rest.error}
        fileTypes={fileTypes}
      >
        <FileImageIcon/>

        <Typography noWrap>
          {fileName || innerText}
        </Typography>

        {isLoading && (
          <CircularProgress size={24} thickness={4} className={classes.progress}/>
        )}
      </DragAndDrop>
    </FieldBase>
  );
};

export { DragAndDropField };
export type { DragAndDropFieldProps };
