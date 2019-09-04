// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import store from 'stores/redux_store.jsx';
import SingleImageView from 'components/single_image_view';

import MarkdownImage from './markdown_image';

describe('components/MarkdownImage', () => {
    const baseProps = {
        imageMetadata: {
            format: 'png',
            height: 165,
            width: 1041,
        },
        alt: 'test image',
        className: 'markdown-inline-img',
        isEmbedVisible: true,
        postId: 'post_id',
    };

    test('should match snapshot', () => {
        const props = {...baseProps, src: '/images/logo.png'};
        const wrapper = shallow(
            <MarkdownImage {...props}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render a link if the source is unsafe', () => {
        const props = {...baseProps, src: '/images/logo.png'};
        const wrapper = shallow(
            <MarkdownImage {...props}/>
        );
        const childrenWrapper = shallow(wrapper.dive({context: {store}}).props().children());

        expect(childrenWrapper.find('a.markdown__link')).toHaveLength(1);
        expect(childrenWrapper).toMatchSnapshot();
    });

    test('should render a SingleImageView if the source is safe', () => {
        const props = {...baseProps, src: 'https://example.com/image.png'};
        const wrapper = shallow(
            <MarkdownImage {...props}/>
        );
        const childrenNode = wrapper.dive({context: {store}}).props().children(props.src);

        expect(childrenNode.type.displayName).toEqual(SingleImageView.displayName);
        expect(childrenNode).toMatchSnapshot();
    });
});
