import { FieldBaseClasses } from './FieldBase.classes';

export function correctClasses(classes?: FieldBaseClasses) {
  setClassIfNeeded(classes, 'root');
  setClassIfNeeded(classes, 'label');
  setClassIfNeeded(classes, 'endAdornment');
  setClassIfNeeded(classes, 'error');
  setClassIfNeeded(classes, 'indicator');
}

function setClassIfNeeded(classes: FieldBaseClasses, className: keyof FieldBaseClasses) {
  if (!classes[className]) {
    classes[className] = {};
  }
}
