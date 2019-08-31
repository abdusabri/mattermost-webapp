// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {isEmbedVisible} from 'selectors/posts';

import MarkdownImage from './markdown_image.jsx';

function mapStateToProps(state, ownProps) {
    return {
        isEmbedVisible: isEmbedVisible(state, ownProps.postId),
    };
}

export default connect(mapStateToProps)(MarkdownImage);
