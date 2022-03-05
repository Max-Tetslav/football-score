import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const rootElement: HTMLElement = document.getElementById('app-root') as HTMLElement;

ReactDOM.render(<App />, rootElement);
