import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CoolApp from "./App";

ReactDOM.render(
    <CoolApp />, document.getElementById('root'));



serviceWorker.unregister();