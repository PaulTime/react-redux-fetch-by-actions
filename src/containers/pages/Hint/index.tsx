import React from 'react';

import { LocationExtended } from 'types';
import BEM from 'services/bem';
import Query from 'services/query';

import './index.scss';

type TProps = { location: LocationExtended };

const bem = BEM('hint-page');

const HOST = process.env.NODE_ENV === 'production' ? process.env.API_HOST : '';

const HintPage: React.FC<TProps> = ({ location }: TProps) => (
  <Query
    action={(): Promise<{}> => window
      .fetch(`${HOST}/api/v1/car-info/${location.query.search}`)
      .then(response => response.json())
    }
    loader={false}
    when={Boolean(location.query.search)}
    watch={[location.query.search]}
  >
    {({ loading, result }: { loading: boolean; result: { [field: string]: string } }): React.ReactNode => (
      <table className={bem()}>
        <caption className={bem('caption')}>Search result</caption>

        <thead className={bem('head')}>
          <tr>
            <th>owner</th>
            <th>year</th>
            <th>crashesCount</th>
            <th>ownersCount</th>
          </tr>
        </thead>

        <tbody className={bem('body', { loading })}>
          <tr>
            {result ? Object.entries(result).map(([field, value]) => (
              <td key={field}><span>{value}</span></td>
            )) : (
              <td colSpan={4}><span className={bem('placeholder')}>try to search cars</span></td>
            )}
          </tr>
        </tbody>
      </table>
    )}
  </Query>
);

HintPage.defaultProps = {
  location: undefined,
};

export default HintPage;