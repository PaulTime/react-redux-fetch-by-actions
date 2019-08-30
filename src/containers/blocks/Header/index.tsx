import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Form } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'query-string';

import { TOnSubmit } from 'types/forms';
import BEM from 'services/bem';
import SearchForm from 'containers/forms/Search';

import './index.scss';

const bem = BEM('header');

const Header: React.FC<RouteComponentProps> = ({ location, history }: RouteComponentProps) => {

  const onsubmit: TOnSubmit = useCallback((values) => {
    history.replace(`${location.pathname}?${qs.stringify(values)}`);
  }, [location.pathname]);

  return (
    <header className={bem()}>
      <h1 className={bem('title')}>header block</h1>

      <Form
        onSubmit={onsubmit}
        component={SearchForm}
        initialValues={qs.parse(location.search)}
      />
    </header>
  )
};

export default compose(
  withRouter,
  React.memo,
)(Header);