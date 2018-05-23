// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import 'react-native/Libraries/Core/InitializeCore';
import {AppRegistry, DeviceEventEmitter, Platform} from 'react-native';

import 'app/mattermost';
import ShareExtension from 'share_extension/android';

import telemetry from 'app/telemetry';

if (Platform.OS === 'android') {
    AppRegistry.registerComponent('MattermostShare', () => ShareExtension);
}

const jsBundleMetrics = 'JS_BUNDLE_METRICS';
const metricsSubscription = DeviceEventEmitter.addListener(jsBundleMetrics, (metrics) => {
    telemetry.capture('jsBundleRun', metrics.jsBundleRunStartTime, metrics.jsBundleRunEndTime);
    DeviceEventEmitter.removeSubscription(metricsSubscription);
});

// Uncomment the snippet below if you want to update the modules
// defined in packager/modulePaths.js so they are included in the main bundle.

/* eslint-disable no-console */
/* eslint-disable no-undef */
if (__DEV__) {
    const modules = require.getModules();
    const moduleIds = Object.keys(modules);
    const loadedModuleNames = moduleIds.
        filter((moduleId) => modules[moduleId].isInitialized).
        map((moduleId) => modules[moduleId].verboseName);

    const waitingModuleNames = moduleIds.
        filter((moduleId) => !modules[moduleId].isInitialized).
        map((moduleId) => modules[moduleId].verboseName);

    // make sure that the modules you expect to be waiting are actually waiting
    console.log(
        'loaded:',
        loadedModuleNames,
        'waiting:',
        waitingModuleNames
    );

    // grab this text blob, and put it in a file named packager/moduleNames.js
    console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`);
}
