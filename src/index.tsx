import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';

import { App } from './components/App';
// import * as serviceWorker from "./serviceWorker";

Sentry.init({
  dsn: 'https://94f09b0a51c74127b82e3fa4d47857c2@sentry.io/1547393',
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
