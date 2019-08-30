import React from 'react';
import { Field } from 'react-final-form';

import { THandleSubmit } from 'types/forms';
import BEM from 'services/bem';
import { composeValidators, required, carNumber } from 'helpers/validators';
import TextInput from 'components/TextInput';

import './index.scss';

type TProps = { handleSubmit: THandleSubmit };

const bem = BEM('search-form');

const SearchForm: React.FC<TProps> = ({ handleSubmit }: TProps) => (
  <form onSubmit={handleSubmit} className={bem()}>
    <Field
      name="search"
      validate={composeValidators(
        required,
        carNumber,
      )}
      component={TextInput}
      id="search"
      placeholder="Car number"
    />

    <button className={bem('submit')} type="submit">
      Search
    </button>
  </form>
);

export default React.memo(SearchForm);