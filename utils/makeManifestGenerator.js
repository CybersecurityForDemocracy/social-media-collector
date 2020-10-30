const GenerateJsonFile = require('generate-json-file-webpack-plugin');

const FB_MATCHES = ['*://*.facebook.com/*'];
const FB_EXCLUDES = ['*://*.facebook.com/ads/archive*', '*://*.facebook.com/ads/library*'];
const YT_MATCHES = ['*://*.youtube.com/*'];
const BASE_MANIFEST = {
  manifest_version: 2,
  homepage_url: 'https://github.com/AlgorithmicTransparencyInstitute/social-media-collector',
  background: {
    scripts: ['background/bundle.js']
  },
  icons: {
    '16': 'assets/icon16.png',
    '32': 'assets/icon32.png',
    '48': 'assets/icon48.png',
    '64': 'assets/icon64.png',
    '128': 'assets/icon128.png'
  },
  browser_action: {
    default_popup: 'toolbar/index.html',
    default_icon: {
      '16': 'images/icon16.png',
      '24': 'images/icon24.png',
      '32': 'images/icon32.png'
    }
  },
  web_accessible_resources: ['webpage/*']
};

const FACEBOOK_CONTENT_SCRIPT = [
  {
    // Facebook specific preloader to add `isTrusted` to events.
    js: ['preload/bundle.js'],
    matches: FB_MATCHES,
    exclude_globs: FB_EXCLUDES,
    run_at: 'document_start'
  }
];
const YOUTUBE_CONTENT_SCRIPT = [
  {
    // Youtube specific preloader to monkeypatch XHR.
    js: ['ytpreload/bundle.js'],
    matches: YT_MATCHES,
    run_at: 'document_start'
  }
];

const makeManifestGenerator = ({ shortSha }) => ({ isFirefox, apiUrl, config }) => {
  const versionName = `${config.version} (${shortSha})`;
  const permissions = ['storage', 'unlimitedStorage'];

  const BUNDLE_CONTENT_SCRIPT = [
    {
      js: ['content/bundle.js'],
      matches: [...FB_MATCHES, ...(config.includeYoutube ? YT_MATCHES : [])],
      exclude_globs: FB_EXCLUDES,
      run_at: 'document_start'
    }
  ];

  const baseManifest = {
    ...BASE_MANIFEST,
    name: config.name,
    short_name: config.name,
    description: config.description,
    version: config.version,
    version_name: versionName,
    browser_action: {
      ...BASE_MANIFEST.browser_action,
      default_title: config.title,
      default_icon: `assets/${config.defaultIcon}`
    },
    homepage_url: config.homepage,
    content_scripts: [
      ...FACEBOOK_CONTENT_SCRIPT,
      ...(config.includeYoutube ? YOUTUBE_CONTENT_SCRIPT : []),
      ...BUNDLE_CONTENT_SCRIPT
    ],
    permissions
  };

  const firefoxManifest = {
    ...baseManifest,
    applications: {
      gecko: {
        id: config.geckoId
      }
    }
  };

  return new GenerateJsonFile({
    filename: '../manifest.json',
    value: isFirefox ? firefoxManifest : baseManifest
  });
};

module.exports = makeManifestGenerator;
