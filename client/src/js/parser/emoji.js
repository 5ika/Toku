import emojify from 'emojify.js';

emojify.setConfig({img_dir: '/assets/emoji'});

module.exports = (content) => emojify.replace(content);
