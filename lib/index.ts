import { Number } from 'types';

const test: Number = 1;

export const sum = (a: number = test, b: number = test): number => a + b;