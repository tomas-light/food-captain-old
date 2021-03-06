import { FieldOption } from './FieldOption';

export function isFieldOption(option: any): option is FieldOption {
  if (typeof option !== 'object' || option == null) {
    return false;
  }
  return nameof<FieldOption>((o) => o.isNullOrEmptySingle) in option;
}
