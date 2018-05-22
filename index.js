// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

/* eslint-disable no-unused-vars */
import {AppRegistry, DeviceEventEmitter, Platform} from 'react-native';

import Mattermost from 'app/mattermost';
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

const app = new Mattermost();
