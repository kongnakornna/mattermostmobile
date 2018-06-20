// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';

import * as CustomPropTypes from 'app/constants/custom_prop_types';
import {convertSearchTermToRegex} from 'app/utils/'

export default class MarkdownText extends React.PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
        highlightedStyle: CustomPropTypes.Style,
        isSearchResult: PropTypes.bool,.isRequired,
        searchMatches: PropTypes.arrayOf(PropTypes.string),
        style: CustomPropTypes.Style.isRequired,
    };

    static defaultProps = {
        isSearchResult: false,
    };

    render() {
        let text = this.props.children;
        if (this.props.isSearchResult && this.props.searchMatches) {
            const searchPatterns = convertSearchTermToRegex(this.props.searchMatches);


        }

        return (
            <
        );
    }
}
