/*
*
* Copyright Guillaume Cisco
* Released under the MIT license
*
* Date: 2016-05-09
*/

import 'babel-core/register';
import 'babel-polyfill';

import FastClick from 'fastclick';
import React from 'react';
import { render } from 'react-dom';
import Root from './app/Root';
import configureStore from './app/configureStore';

const store = configureStore();

FastClick.attach(document.body);

render(
    <Root {...{ store }} />,
    document.getElementById('root')
);

