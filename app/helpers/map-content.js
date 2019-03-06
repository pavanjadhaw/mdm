'use strict';

const emojiconvert = require("markdown-to-text-emoji").textEmoji

/**
 * This function takes the extracted content from markdown file
 * and maps it to valid object required for publishing on medium.
 * Returns body object with valid mapped content.
 *
 * @param {Object} md object extracted from markdown file
 * @returns {Object} valid mapped object
 */
const mapContent = md => {
  return {
    title: md.attributes.title,
    contentFormat: 'markdown',
    content: emojiconvert(md.body),
    tags: md.attributes.tags,
    publishStatus: md.attributes.status,
  };
};

module.exports = mapContent;
