window.$ = require('jquery');
window.jQuery = window.$;
require('materialize-css');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Stoast from './stoast';

window.toast = (msg) => Stoast.toast(msg, 3000);

$(() => {
    Stoast.init();
    ReactDOM.render(
        <App/>, document.getElementById('App'));
});
