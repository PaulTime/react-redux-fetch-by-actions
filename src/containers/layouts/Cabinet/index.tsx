import React from 'react';

import BEM from 'services/bem';
import Header from 'containers/blocks/Header';

import './index.scss';

type TProps = {
  children: React.ReactNode;
};

const bem = BEM('layout');

const CabinetLayout: React.FC<TProps> = (props: TProps) => (
  <div className={bem()}>
    <Header />
    <main className={bem('content')}>{props.children}</main>
  </div>
);

export default React.memo(CabinetLayout);