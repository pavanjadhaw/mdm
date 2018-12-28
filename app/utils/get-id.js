'use strict';
const got = require('got');
const ora = require('ora');

/**
 * This function takes medium integration token as argument
 * and provided user with his unique author id
 * which can be exported and later used for publishing posts.
 *
 * @param {String} token is medium integration token
 */
const getId = async token => {
  const spinner = ora(`Getting your unique medium userid…`).start();

  try {
    if (!token) {
      spinner.fail('Medium integration token missing.');
      process.exit(1);
    }

    const response = await got('https://api.medium.com/v1/me', {
      headers: { Authorization: 'Bearer ' + token },
    });
    spinner.succeed(`Found your medium authorID,
now to publish post add following to your ~/.bashrc or ~/.zshrc

export MEDIUM_ID='${JSON.parse(response.body).data.id}'`);
  } catch (error) {
    if (error.statusCode === 401)
      spinner.fail('The provided accessToken is invalid or has been revoked.');
    else spinner.fail(`Unknown error, ${error}`);
  }
};

module.exports = getId;
