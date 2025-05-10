import { NextPage } from 'next';

declare module 'next' {
  export type PageProps<P = Record<string, unknown>> = {
    params: P;
    searchParams: { [key: string]: string | string[] | undefined };
  };
} 