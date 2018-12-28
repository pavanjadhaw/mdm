'use strict';
const got = require('got');
const ora = require('ora');

const parseMd = require('../helpers/parse-md');
const mapContent = require('../helpers/map-content');

/**
 * This function takes medium integration token, unique author id
 * and path to markdown file as argument
 * and makes post request to medium api to publish given markdown file
 * under given authors publications.
 *
 * @param {String} id is unique author id
 * @param {String} token is medium integration token
 * @param {String} markdownFile is markdown file to be published
 */
const post = async (id, token, markdownFile) => {
  const spinner = ora(`Publishing ${markdownFile} to medium…`).start();

  try {
    if (!id || !token) {
      spinner.fail('Medium integration token or authorID missing.');
      process.exit(1);
    }

    const body = mapContent(await parseMd(markdownFile));
    const response = await got(`https://api.medium.com/v1/users/${id}/posts`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body,
      json: true,
    });

    if (response.statusCode === 201) {
      spinner.succeed(
        `Done! Your post has been published at
${response.body.data.url}`
      );
    }
  } catch (error) {
    if (error.statusCode === 400)
      spinner.fail('Required fields were invalid, not specified.');
    else if (error.statusCode === 401)
      spinner.fail('The access token is invalid or has been revoked.');
    else if (error.statusCode === 403)
      spinner.fail(
        'The user does not have permission to publish, or the authorId in the request path points to wrong/non-existent user.'
      );
    else if (error.statusCode === 429)
      spinner.fail('You have reached the rate limit for publishing today..');
    else {
      console.error('Unknown error.', error);
      process.exit(1);
    }
  }
};

module.exports = post;
