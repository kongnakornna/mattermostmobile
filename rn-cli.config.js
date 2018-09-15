// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const alternateRoots = [
    path.resolve(__dirname, '.'),
];

const config = {
    watchFolders: alternateRoots,
    resolver: {
        blacklistRE: blacklist,
    },
};

module.exports = config;
