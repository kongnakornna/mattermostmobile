import React from 'react';
import ReactNative from 'react-native';
import {ViewTypes} from 'app/constants';

let store;

export function setPluginStore(pluginStore) {
    store = pluginStore;
}

export function initializePlugins() {
    if (global.plugins.rntest) {
        console.log('found rntest');
        global.plugins.rntest.initialize(registerComponents, store);
    } else {
        console.log('missing rntest');
    }
}

function registerComponents(id, components = {}, postTypes = {}) {
    const wrappedPostTypes = {};
    Object.keys(postTypes).forEach((type) => {
        wrappedPostTypes[type] = {component: postTypes[type], id};
    });

    store.dispatch({
        type: ViewTypes.RECEIVED_PLUGIN_POST_TYPES,
        data: wrappedPostTypes,
    });
}

global.react = React;
global['react-native'] = ReactNative;
global.plugins = {};
global.initializePlugins = initializePlugins;
