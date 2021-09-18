import clsx from 'clsx';
import React, {
    FC,
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { StyledComponentProps } from '@material-ui/core';
import { withStyles } from '@shared/theme';

import { guid } from '@utils';
import { FileHelper } from '@utils/files';
import { EventHandler } from './EventHandler';

function checkFilesExtension(files: FileList, fileTypes: string) {
  let extensionIsAllowed = true;
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    const extension = FileHelper.getFileExtension(file);
    if (fileTypes.indexOf(extension) === -1) {
      extensionIsAllowed = false;
      break;
    }
  }
  return extensionIsAllowed;
}

type ClassKey =
  | 'root'
  | 'idle'
  | 'error'
  | 'dragging'
  ;

interface DragAndDropProps {
  id?: string;
  name?: string;
  error?: boolean;
  fileTypes?: string;
}

interface DragAndDropCallProps {
  onDrop: (files: FileList) => void;
}

type Props = DragAndDropProps
  & DragAndDropCallProps
  & StyledComponentProps<ClassKey>;

const DragAndDrop: FC<Props> = (props) => {
  const {
    classes,
    onDrop,
    children,
    id = guid(),
    name,
    error,
    fileTypes = 'image/jpeg',
    ...rest
  } = props;

  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [eventHandler] = useState(new EventHandler());

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const div = ref.current;

    div.addEventListener('dragenter', handleDragEnter);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('dragover', stopEvent);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDragEnter);
      div.removeEventListener('dragleave', handleDragLeave);
      div.removeEventListener('dragover', stopEvent);
      div.removeEventListener('drop', handleDrop);
    };
  }, [ref, ref.current]);

  const stopEvent = (dragEvent: DragEvent) => {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
  };

  const handleDragEnter = (dragEvent: DragEvent) => {
    const { dataTransfer: { items } } = dragEvent;
    stopEvent(dragEvent);

    eventHandler.in();
    if (items && items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave = (dragEvent: DragEvent) => {
    stopEvent(dragEvent);

    eventHandler.out();
    if (!eventHandler.check()) {
      return;
    }

    setDragging(false);
  };

  const handleDrop = (dragEvent: DragEvent) => {
    const { files } = dragEvent.dataTransfer;
    stopEvent(dragEvent);

    setDragging(false);
    if (files && files.length > 0) {
      const extensionIsAllowed = checkFilesExtension(files, fileTypes);
      if (!extensionIsAllowed) {
        return;
      }

      onDrop(files);
      eventHandler.done();
    }
  };

  const handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (!files || !files.length) {
      return;
    }

    const extensionIsAllowed = checkFilesExtension(files, fileTypes);
    if (extensionIsAllowed) {
      onDrop(files);
    }
  };

  const handleOnClick = () => {
    document.getElementById(id).click();
  };

  return (
    <div
      ref={ref}
      className={clsx(classes.root, {
        [classes.idle]: !dragging,
        [classes.error]: error,
        [classes.dragging]: dragging,
      })}
      onClick={handleOnClick}
      {...rest}
    >
      <input
        id={id}
        name={name}
        style={{ display: 'none' }}
        type="file"
        accept={fileTypes}
        onChange={handleOnChange}
      />
      {children}
    </div>
  );
};

const componentWithStyles = withStyles<ClassKey>({
  root: {},
  idle: {},
  error: {},
  dragging: {},
}, { name: 'DragAndDrop' })(DragAndDrop);

export type {
  DragAndDropProps,
  DragAndDropCallProps,
  ClassKey as DragAndDropClassKey,
};
export { componentWithStyles as DragAndDrop };
