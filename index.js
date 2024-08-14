// /**
//  * @format
//  */
//
// import {AppRegistry} from 'react-native';
import App from './app/App';
// import {name as appName} from './app.json';
//
// AppRegistry.registerComponent(appName, () => App);
import 'react-native-get-random-values';
import { LogBox } from 'react-native';

// Check if crypto.getRandomValues is available
if (!global.crypto || !global.crypto.getRandomValues) {
    console.error('crypto.getRandomValues is not available.');
} else {
    console.log('crypto.getRandomValues is available.');
}

LogBox.ignoreAllLogs(); // To ignore log warnings if necessary

// Your other imports
import React from 'react';
// import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
