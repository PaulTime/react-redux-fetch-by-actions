import H from 'history';
import { ParsedQuery } from 'query-string';

export interface AnyObject {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type LocationExtended = H.Location & {
  query: ParsedQuery;
}