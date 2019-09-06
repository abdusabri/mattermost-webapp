// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import ExternalImage from 'components/external_image';
import SingleImageView from 'components/single_image_view';

export default function MarkdownImage({imageMetadata, src, ...props}) {
    return (
        <ExternalImage
            src={src}
            imageMetadata={imageMetadata}
        >
            {(safeSrc) => {
                if (!safeSrc) {
                    return (
                        <a
                            className='theme markdown__link'
                            href={src}
                            rel='noopener noreferrer'
                            target='_blank'
                            title={props.title}
                        >
                            {props.alt}
                        </a>
                    );
                }

                const getFileExtentionFromUrl = url => url.substring(safeSrc.lastIndexOf('.') + 1);
                return (
                    <SingleImageView
                        fileInfo={{
                            extension: imageMetadata.format || getFileExtentionFromUrl(safeSrc),
                            height: imageMetadata.height,
                            width: imageMetadata.width,
                            link: safeSrc,
                            name: props.alt,
                        }}
                        isEmbedVisible={props.isEmbedVisible}
                        postId={props.postId}
                    />
                );
            }}
        </ExternalImage>
    );
}

MarkdownImage.propTypes = {
    alt: PropTypes.string,
    imageMetadata: PropTypes.object,
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    isEmbedVisible: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
};

MarkdownImage.defaultProps = {
    imageMetadata: {},
};
