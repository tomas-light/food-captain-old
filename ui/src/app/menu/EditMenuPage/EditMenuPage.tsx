import { Menu } from '@models';
import { Typography } from '@shared/atoms';
import React, { useEffect } from 'react';
import { DefaultFieldSubscription, useForm } from 'final-form-app-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { makeStyles } from '@shared/theme';

import { SelectFieldOption } from '@select';
import { Button } from '@shared/molecules/buttons';
import { SelectFormField, TextFormField } from '@shared/templates/formFields';
import { EditMenuFormValues } from './models';
import { EditMenuValidation } from './validation';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    // gridTemplateAreas: `
    //   '.' 'siteName' '.'
    //   'domain' '.'
    //   'favicon' '.'
    //   'openGraph' '.'
    //   'colors' '.'
    //   'stepper'
    // `,
    // gridTemplateRows: `
    //   48px auto 64px
    //   auto 60px
    //   auto 132px
    //   auto 264px
    //   auto 80px
    //   auto
    // `,
  }
});

interface EditMenuPageProps {
  openedMenu: Menu;
  initialValues: EditMenuFormValues;
  authorOptions: SelectFieldOption<number>[];
  dishOptions: SelectFieldOption<number>[];
}

interface EditMenuPageCallProps {
  loadMenu: (menuId: number) => void;
  loadDishes: () => void;
  loadAuthors: () => void;
  onSave: (formValues: EditMenuFormValues) => void;
}

type Props = EditMenuPageProps & EditMenuPageCallProps

const EditMenuPage = (props: Props) => {
  const {
    openedMenu,
    initialValues,
    authorOptions,
    dishOptions,

    loadMenu,
    loadDishes,
    loadAuthors,
    onSave,
  } = props;

  const classes = useStyles();

  const { menuId } = useParams();
  useEffect(() => {
    loadMenu(menuId);
    loadDishes();
    loadAuthors();
  }, [])

  const { t } = useTranslation();
  const [Form] = useForm<EditMenuFormValues>(
    onSave,
    new EditMenuValidation(t),
    { resetValidationErrorOnActiveField: true }
  );

  if (!openedMenu) {
    return null;
  }

  return (
    <Form initialValues={initialValues} subscribe={{ pristine: true }}>
      {(state) => (
        <div className={classes.root}>
          <TextFormField
            name={nameof<EditMenuFormValues>(o => o.name)}
            label={t('title')}
            // InputProps={{
            //   placeholder: t('Вкусный кофе и булочки!'),
            // }}

            subscription={DefaultFieldSubscription}
            required
            // classes={{
            //   root: {
            //     root: classes.field,
            //   },
            // }}
            // sideOnChange={onChange}
          />

          {!openedMenu.createDate ? null : (
            <Typography>
              {t('create date', { date: openedMenu.createDate.toLocaleDateString() })}
            </Typography>
          )}

          {!openedMenu.lastUpdate ? null : (
            <Typography>
              {t('last update', { date: openedMenu.lastUpdate.toLocaleDateString() })}
            </Typography>
          )}
          {/*<TextFormField
            name={nameof<EditMenuFormValues>(o => o.createDate)}
            label={t('create date')}
            subscription={DefaultFieldSubscription}
            readonly
          />

          <TextFormField
            name={nameof<EditMenuFormValues>(o => o.lastUpdate)}
            label={t('last update')}
            subscription={DefaultFieldSubscription}
            readonly
          />*/}

          <SelectFormField
            name={nameof<EditMenuFormValues>(o => o.author)}
            label={t('author')}
            variant="single-simple"
            options={authorOptions}
            subscription={DefaultFieldSubscription}
            // required
            // classes={{
            //   root: {
            //     root: classes.field,
            //   },
            // }}
            // sideOnChange={onChange}
          />

          <SelectFormField
            name={nameof<EditMenuFormValues>(o => o.dishes)}
            label={t('dishes')}
            variant="multi-simple"
            options={dishOptions}
            subscription={DefaultFieldSubscription}
            isMulti
            // required
            // classes={{
            //   root: {
            //     root: classes.field,
            //   },
            // }}
            // sideOnChange={onChange}
          />

          <Button
            // variant="form"
            // className={classes.button}
            type="submit"
            state={{
              // loading: isSaving,
              pristine: state.pristine,
            }}
          >
            Save
          </Button>
        </div>
      )}
    </Form>
  );
};

export type { EditMenuPageProps, EditMenuPageCallProps };
export { EditMenuPage };
