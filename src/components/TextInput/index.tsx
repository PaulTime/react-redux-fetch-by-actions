import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

import BEM from 'services/bem';

import './index.scss';

const bem = BEM('text-input');

type TProps = {
  input: FieldInputProps<string, HTMLInputElement>;
  meta: FieldMetaState<string>;
  id: string;
  placeholder?: string;
};

const TextInput: React.FC<TProps> = ({ input, meta, id, placeholder }: TProps) => (
  <label htmlFor={id} className={bem()}>
    <input
      type="text"
      {...input}
      id={id}
      placeholder={placeholder}
    />

    {meta.touched && meta.error && (
      <span className={bem('error')}>{meta.error}</span>
    )}
  </label>
);

TextInput.defaultProps = {
  placeholder: undefined,
};

export default React.memo(TextInput);