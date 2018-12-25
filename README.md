My awesome portfolio website: https://szczepan.me

## Coverage:

[![Coverage Status](https://coveralls.io/repos/github/lukasz81/szczepan.me/badge.svg?branch=master)](https://coveralls.io/github/lukasz81/szczepan.me?branch=master)

[![CircleCI](https://circleci.com/gh/lukasz81/szczepan.me/tree/master.svg?style=shield)](https://circleci.com/gh/lukasz81/szczepan.me/tree/master)

What's cool about it (features):

1) Vanilla js to randomly pick RGB values (using babel to transpile to old js).
2) Apply RGB as background gradient.
3) Animate change of the background colors.
4) SVG <use> tags.
5) Responsive design.
6) Use css native vars to hold and update color values, otherwise it's SASS.
7) It's a secure SSL connection over "https://".
8) Test Driven Development with Jest framework.
9) It's continues integration with circleCI.

## How to run dev:
$npm install: will install all dependencies.

$brew install http-server

$http-server: to run dev.

$sass --watch css: to watch the whole css directory

$npm run test: run tests

Babel is run, html loads raw js from /dist directory


