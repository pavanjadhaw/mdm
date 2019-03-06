'use strict';
const meow = require('meow');

const getId = require('./utils/get-id');
const post = require('./utils/post');

const { id, token } = require('./config');

const cli = meow(
  `
  Usage
    $ npx @pavanjadhaw/mdm init
    $ npx @pavanjadhaw/mdm publish <myAwesomePost.md> …

  Examples
	  $ npx @pavanjadhaw/mdm publish myAwesomePost.md
`,
  {
    flags: {
      help: {
        alias: 'h',
      },
      version: {
        alias: 'v',
      },
    },
  }
);

const input = cli.input[0];

(async () => {
  if (input === 'init') {
    getId(token);
  } else if (input === 'publish') {
    const markdownFile = cli.input[1];
    post(id, token, markdownFile);
  } else {
    console.error(`Specify markdown file to publish
    
    Use '$ npx @pavanjadhaw/mdm -h' for help`);
    process.exit(1);
  }
})();

process.on('SIGINT', () => {
  console.log('\n\nOperation aborted!');
  process.exit(1);
});
