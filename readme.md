<div align="center">
	<div>
		<img src=".hero.png" alt="up">
	</div>
</div>
<p align="left">
	<!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used"/>
  </a>
	<!-- Version - npm -->
	<a href="https://www.npmjs.com/package/@pavanjadhaw/mdm">
    <img src="https://img.shields.io/npm/v/@pavanjadhaw/mdm.svg" alt="Latest version on npm" />
  </a>
	<!-- License - MIT -->
  <a href="https://github.com/pavanjadhaw/mdm/blob/master/license">
    <img src="https://img.shields.io/github/license/pavanjadhaw/mdm.svg" alt="Project license" />
  </a>
</p>

> publish your markdown to medium, from cli

MDM is commandline utility that lets you publish your markdown documents
without leaving your comfy terminal.

## Install

No installation required. Can be directly used via ```npx```!

## Initialization

MDM requires medium integration token and author id to be able to publish your markdown.
You can generate integration token from the medium [settings](https://medium.com/me/settings) page.
Export this integration token by adding it to your `~/.bashrc` or `~/.zshrc` as follows

```sh
export MEDIUM_TOKEN='token here'
```

After adding integration token you can easily get your unique author id by running 

`npx @pavanjadhaw/mdm init`

Then export your unique author id as follows

```sh
export MEDIUM_ID='authorID here'
```

Now you are good to go...

## Publishing

For publishing, your markdown doc must have the following frontmatter:

```yaml
---
title: My Awesome Post
tags: ['some', 'tags', 'here']
status: draft
---
## markdown here
```

Note that the `status` field can be either `draft` or `public`. I recommend that you publish them as drafts and fine tune using Medium’s editor.

If your post contains images, host them somewhere public and then include them in your document like so:

```markdown
![cat](https://catpics.com/some_cat.png)
```

Medium will then CDN it and you can delete it from there if you want to.

When you’re ready to publish, run

```console
$ npx @pavanjadhaw/mdm publish path/to/markdown.md
Done! Your post has been published at https://medium.com/@gaben/76272e9d241c
```

It’s that simple.

## Inspiration

This project is completely based on [@icyphox](https://github.com/icyphox)'s [mdium](https://github.com/icyphox/mdium) project.
[mdium](https://github.com/icyphox/mdium) is written is python, I wanted to try and implement it in node.

## License

MIT © [Pavan Jadhaw](https://pavanjadhaw.me)
