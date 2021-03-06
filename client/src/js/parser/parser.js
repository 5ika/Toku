import React from 'react';
import {renderToString} from 'react-dom/server';
import Sanitizer from 'xss';
import emojify from './emoji';

const emojis = (content) => emojify(content);

const hashtags = (content) => content.replace(/#[A-Za-z0-9-_]+/g, (tag) => renderToString(
    <span className='hashtag'>{tag}</span>
));
const ats = (content) => content.replace(/@[A-Za-z0-9-_]+/g, (at) => renderToString(
    <span className='at'>{at}</span>
));

const parser = (content) => {
    const sanitized = Sanitizer(content);
				const wEmojis = emojis(sanitized);
    const wHashtags = hashtags(wEmojis);
    const wAt = ats(wHashtags);
    return wAt;
}

module.exports = parser;
 parser;
