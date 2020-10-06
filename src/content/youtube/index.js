import adAnalysis from './adAnalysis';
import adReporting from './adReporting';
import makeHandler from './utils/makeHandler';

const handler = makeHandler(adAnalysis, adReporting);

export const start = () => {
  fetch('https://observations.nyuapi.org/ok')
    .then(response => response.json())
    .then(data => {
      if (data.ytStatus === 'ok') {
        window.addEventListener('message', handler);

        if (process.env.IS_DEBUG === 'true') {
          console.debug('Start YouTube scanner', chrome.runtime.id);
        }
      } else {
        if (process.env.IS_DEBUG === 'true') {
          console.log("Didn't start YT script.");
        }
      }
    });
};
