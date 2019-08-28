import React from 'react';
import PropTypes from 'prop-types';

import BEM from 'services/bem';
// import Header from 'containers/blocks/Header';

import './index.scss';

const bem = BEM('layout');

const CabinetLayout: React.FC = props => (
  <div className={bem()}>
    {/*<Header />*/}
    <main className={bem('content')}>{props.children}</main>
  </div>
);

CabinetLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(CabinetLayout);