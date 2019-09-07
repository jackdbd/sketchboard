import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

import './css/index.css';
Sentry.init({
  dsn: 'https://94f09b0a51c74127b82e3fa4d47857c2@sentry.io/1547393',
});

ReactDOM.render(<App />, document.getElementById('root'));
