'use strict';
const fs = require('fs');
const { promisify } = require('util');

const fm = require('front-matter');

const readFile = promisify(fs.readFile);

/**
 * This function extracts and parses frontmatter from given markdown file.
 * Returns content object with attribute and body properties.
 *
 * @param {markdown} file is path to markdown file
 * @returns {Object} parsed content from given markdown file
 */
const parseMd = async file => {
  try {
    const data = await readFile(file, 'utf8');
    return fm(data);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = parseMd;
