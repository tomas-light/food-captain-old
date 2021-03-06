import { EditMenuFormValues } from '@app/menu/EditMenuPage/models/EditMenuFormValues';
import { ValidatorBase } from '@utils';
import { IValidator, ModelState } from 'model-state-validation';

export class EditMenuValidation
  extends ValidatorBase
  implements IValidator<EditMenuFormValues> {

  validate(model: EditMenuFormValues): ModelState {
    const modelState = new ModelState();

    if (this.nameIsNotValid(model.name)) {
      modelState.addError(
        nameof<EditMenuFormValues>((o) => o.name),
        this.translate('required field')
      );
    }

    if (this.authorIsNotValid(model.author)) {
      modelState.addError(
        nameof<EditMenuFormValues>((o) => o.author),
        this.translate('invalid field')
      );
    }

    if (this.dishesIsNotValid(model.dishes)) {
      modelState.addError(
        nameof<EditMenuFormValues>((o) => o.dishes),
        this.translate('invalid field')
      );
    }

    return modelState;
  }

  nameIsNotValid(name: any): boolean {
    return ValidatorBase.isNullOrEmptyString(name);
  }

  authorIsNotValid(author: any): boolean {
    return !ValidatorBase.isNullOrUndefined(author)
      && !ValidatorBase.isPositiveOrZeroNumber(author);
  }

  dishesIsNotValid(dishes: any): boolean {
    return !ValidatorBase.isNullOrUndefined(dishes)
      && !ValidatorBase.isNumberArray(dishes);
  }
}
