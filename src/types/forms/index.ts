import React from 'react';
import { AnyObject } from 'react-final-form';

export type TValue<V = any> = V; // eslint-disable-line @typescript-eslint/no-explicit-any
export type TError<E = string | undefined> = E;
export type TValidator<Value = TValue, E = TError> = { (V: Value): E };

export type THandleSubmit = (
  event?: React.SyntheticEvent<HTMLFormElement>
) => Promise<AnyObject | undefined> | undefined

export type TOnSubmit = (values?: object) => Promise<AnyObject | undefined> | undefined | void