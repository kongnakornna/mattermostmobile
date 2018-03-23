// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {combineReducers} from 'redux';

import {ViewTypes} from 'app/constants';

function postTypes(state = {}, action) {
    switch (action.type) {
    case ViewTypes.RECEIVED_PLUGIN_POST_TYPES: {
        if (action.data) {
            return {...action.data, ...state};
        }
        return state;
    }
    default:
        return state;
    }
}

export default combineReducers({

    // object where every key is a post type and the values are components wrapped in an
    // an object that contains a plugin id
    postTypes,
});

