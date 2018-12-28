'use strict';
const meow = require('meow');

const getId = require('./utils/get-id');
const post = require('./utils/post');

const { id, token } = require('./config');

const cli = meow(
  `
	Usage
    $ mdm --publish <myAwesomePost.md> …

  Options
    --init,    -i     Get unique user id required for publishing posts.
    --publish, -p     Publishes markdown to medium.

  Examples
	  $ mdm --publish myAwesomePost.md
    $ mdm -p ~/medium/draft/latest.md
`,
  {
    flags: {
      init: {
        type: 'boolean',
        alias: 'i',
      },
      publish: {
        type: 'string',
        alias: 'p',
      },
      help: {
        alias: 'h',
      },
      version: {
        alias: 'v',
      },
    },
  }
);

const { init, publish } = cli.flags;

(async () => {
  if (init) {
    getId(token);
  } else if (publish) {
    const markdownFile = publish;
    post(id, token, markdownFile);
  } else {
    console.error('Specify markdown file to publish...');
    process.exit(1);
  }
})();

process.on('SIGINT', () => {
  console.log('\n\nOperation aborted!');
  process.exit(1);
});
