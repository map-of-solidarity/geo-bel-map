// This allows TypeScript to detect our global value
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd();

import * as Sentry from '@sentry/node';

export const initSentry = () => {
  return Sentry.init({
    dsn:
      'https://78ca537e289c4344976893f3a7bf8cc7@o382492.ingest.sentry.io/5395969',
  });
};
