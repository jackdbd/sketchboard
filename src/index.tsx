import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

import './css/index.css';

/**
 * We could use the CDN hosted version of the Sentry JavaScript browser SDK, but
 * Ad blockers would probably block Sentry from submitting crash reports.
 * Instead, we add Sentry as a dependency (unfortunately, this means that it
 * will end up in the final bundle).
 */
Sentry.init({
  dsn: 'https://94f09b0a51c74127b82e3fa4d47857c2@sentry.io/1547393',
});

ReactDOM.render(<App />, document.getElementById('root'));
