# Social Media Monitor Extension

A white-labellable browser extension that allows you to analyse your facebook feed for targeted content.

## Usage

The Contributor Browser Extension is available for the following browsers:

- [Chrome] — _url to be provided_
- [Firefox] — _url to be provided_

Once installed **you must accept the standard terms and conditions of use**. The extension will then begin to scan your facebook feed and youtube pages for ads, sponsored posts, and other targeted content and send that data in an anonymised manner to our servers for analysis.

## Development

<!-- prettier-ignore -->
| branch    | status | coverage | notes                 |
| --------- | ------ | -------- | --------------------- |
| `develop` | [![CircleCI](https://circleci.com/gh/AlgorithmicTransparencyInstitute/social-media-collector/tree/develop.svg?style=svg&circle-token=5373d9cc27e3f366db288363c7074a64f2d628d9)](https://circleci.com/gh/AlgorithmicTransparencyInstitute/social-media-collector/tree/develop) | [![codecov](https://codecov.io/gh/AlgorithmicTransparencyInstitute/social-media-collector/branch/develop/graph/badge.svg)](https://codecov.io/gh/AlgorithmicTransparencyInstitute/social-media-collector) | work in progress      |
| `master`  | [![CircleCI](https://circleci.com/gh/AlgorithmicTransparencyInstitute/social-media-collector/tree/master.svg?style=svg&circle-token=5373d9cc27e3f366db288363c7074a64f2d628d9)](https://circleci.com/gh/AlgorithmicTransparencyInstitute/social-media-collector/tree/master) | [![codecov](https://codecov.io/gh/AlgorithmicTransparencyInstitute/social-media-collector/branch/master/graph/badge.svg)](https://codecov.io/gh/AlgorithmicTransparencyInstitute/social-media-collector) | latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.16.3 (LTS) (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

  Note: The browser extension **will not build** under Node 12.17.0 or higher.

### Installation

There is currently an issue with one or more of the dependencies which means that to install you **must** run `npm install` and then

```sh
npm ci
```

instead of just `npm install`.

## Continuous build environment (single machine)

Build the extension once:

```sh
npm run build
```

Build the extension continuously as you edit files:

```sh
npm run watch
```

### Actual real-life development:

in two separate terminals, run these commands.

```sh
npm run chrome -- -- --env file=./nyu-build-config.js --env build=debug  --env config=std
npm run watch -- --env file=./nyu-build-config.js --env browser=chrome --env build=debug --env config=std
```

This starts a fresh Chrome install and also continuously monitors the code and recompiles it.

### Build output

Both of the above scripts will generate eight output folders named in the format `{browser}-{config}-{build}`.

- `browser` is one of `firefox` or `chrome`
- `config` is one of `std` or `qa`

  - `std` configurations are intended for general users
  - `qa` configurations come with an additional analysis sidebar panel

- `build` is one of `release` or `debug`.

  - `release` builds are minified and optimized
  - `debug` builds contain the source code and metadata for debuggers.

You can specify which `browser`, `config`, and `build` via command line params. For example to only build the `chrome-std-debug` version run:

```sh
npm run build -- --env browser=chrome --env config=std --env build=debug
```

To specify the correct backend to connect to, supply an `--env api=` param.

| env api=      | backed api url                |
| ------------- | ----------------------------- |
| `offline`     |                               |
| `local`       | http://localhost:7000         |
| `development` | https://dev.atiapi.org/v2     |
| `staging`     | https://staging.atiapi.org/v2 |
| `production`  | https://prod.atiapi.org/v2    |

If you do not provide an `--env api` param it will default to `process.env NODE_ENV`, or if that's not available, `local`.

If you choose `offline` then it will only log the api server call but not actually attempt it.

## White-labelling

You can create your own customised version of this extension by making a copy of the [`build-config.js`](build-config.js) and, optionally create a new `assets` folder, then, in your copy of `build-config` overwrite whatever information you wish.

So if, for example, you create your own build config called `alt-build-config.js` in the root folder of this project, then you'd use it by adding the param `--env file=./alt-build-conf`.

Any API URL you set in that file will be used as the default url, unless you specify an `--env api` option. The `--env api` option will override whatever you set in your copy of `build-config.js`.

## NYU Release Ritual

1. up the version in the build config file (`nyu-build-config.js` or `legacy-build-config.js`). Legacy is `v2.y.z`, Full is `v3.y.z`.
2. tag a version, push tag, `git tag vx.0.2` (or whatever).
3. build both legacy and standard
 - legacy:
 	1. `npm run build -- --env file=./legacy-build-config.js --env build=release --env config=std`
 	2. `pushd build/chrome-std-release && zip -r0 ../chrome-$(jq .version manifest.json | tr -d \").zip ./* && popd`
 	3. `pushd build/firefox-std-release && zip -r0 ../firefox-$(jq .version manifest.json | tr -d \").zip ./* && popd`
 - standard: 
 	1. `npm run build -- --env file=./nyu-build-config.js --env build=release --env config=std`
 	2. `pushd build/chrome-std-release && zip -r0 ../chrome-$(jq .version manifest.json | tr -d \").zip ./* && popd`
 	3. `pushd build/firefox-std-release && zip -r0 ../firefox-$(jq .version manifest.json | tr -d \").zip ./* && popd`
4. download source zip for Firefox
5. upload source zip to Firefox with msg "There are instructions for how to build the extension in the README in the extension/ folder in the archive -- you'll want to run `npm install`, then `npm ci` and then use `$ npm run build -- --env file=./nyu-build-config.js --env build=release --env config=std --env browser=firefox` to generate the same minified, production code as in the uploaded version of the extension. Be sure to check the output for sporadic network errors; I've verified that these instructions work in a clean build environment."

## Unit tests

Unit tests do not require a running backend server.

Run the unit tests:

```sh
npm test
```

## Repository organization

For a quick overview of the parts of a browser extension, visit:

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

### Common

Common utilities, located in `src/common` used by both the background script and the content scripts are found here. This includes interaction with local storage, UI utilities, various constants, and global stylesheet definitions.

### Background

The background script, located in `/src/background`, handle interaction with the API server, and maintain the extension's badge UI.

### Content

Content scripts are located in `/src/content`.

We don't use the content scripts to communicate with the backend server. Content scripts send relevant information to the background script which in turn interacts with the API server.

### User Interface

UI elements are separate React apps located in `/src/toolbar`, and `/src/webpage`.

### Messaging

Messaging tools for the background scripts, content scripts, and UI elements are located in `/src/messaging/`.

### Preload scripts

The `preload` script is loaded into Facebook prior to loading the HTML document, in order for the extension to programmatically click on the menu icon, to open the menu item "Why am I seeing this ad?"

The `ytpreload` script is loaded into YouTube prior to loading the HTML document, in order for the extension to intercept XHR requests correctly.

## Contributing

Please see the [contributing notes](CONTRIBUTING.md) and the [code of conduct](CODE_OF_CONDUCT.md).
