import { debounce } from 'debounce';

import { checkConsent } from 'common/storage/consent';

import normaliseCommonData from './utils/post/normaliseCommonData';
import buildInitialPosts from './utils/post/buildInitialPosts';
import makeFilteredUtilities from './filter/makeFilteredUtilities';

let isStarted;
let isScanning;
let isSuspended;
let suspensionTimer;
let commonData;

// only exported for use in tests.
export function reset() {
  isStarted = false;
  isScanning = false;
  isSuspended = false;
  suspensionTimer = null;
  commonData = {};
}

/* istanbul ignore next */
export const suspend = () => {
  suspensionTimer =
    suspensionTimer ||
    setTimeout(() => {
      isSuspended = false;
      suspensionTimer = null;
    }, 60 * 60); // suspend for an hour.
  isSuspended = true;
};

const scanElements = async () => {
  const { posts, version } = buildInitialPosts();
  if (!posts.length) {
    console.debug('No visible posts');
    return;
  }

  const { applyFilters, send, report } = await makeFilteredUtilities(version);

  console.log('d1.2', posts);
  await applyFilters(posts);
  console.log('d1.3', posts);
  await report(posts);
  console.log('d1.4', posts);
  await send(posts); // TODO: send should not also tag as processed. That should be a separate step.
};

const doScan = async () => {
  /* istanbul ignore if */
  if (!isStarted || isScanning || isSuspended) return;
  const okay = await checkConsent();
  if (!okay) return;

  isScanning = true;
  console.debug('Started scan of Facebook posts', chrome.runtime.id);
  console.time('fb-scanner');

  try {
    await scanElements();
  } catch (err) {
    /* istanbul ignore next */
    console.error(err);
  }

  console.timeEnd('fb-scanner');
  console.debug('Finished scan of Facebook posts');
  isScanning = false;
};

const DELAY = 100; // milliseconds

const startScan = data => {
  commonData = normaliseCommonData(data);

  const scan = debounce(doScan, DELAY);
  window.addEventListener('scroll', scan);
  window.addEventListener('resize', scan);
  setTimeout(scan, 1);
};

const paramsHandler = ({ source, data: { type, ...data } }) => {
  /* istanbul ignore if */
  if (source !== window || type !== 'asyncParams') return;

  // we only want to hear this message once.
  window.removeEventListener('message', paramsHandler);
  startScan(data);
  return true;
};

export const start = () => {
  if (isStarted) {
    console.error('scanner has already started');
    return;
  }

  window.addEventListener('message', paramsHandler);
  isStarted = true;

  window.postMessage({ type: 'getAsyncParams' });
};

reset(); // just to set the initial values.

export const getCommonData = () => {
  if (!isStarted) throw new Error('Scanner has not started');
  return commonData;
};
