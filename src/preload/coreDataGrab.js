/* eslint-disable no-useless-escape */
(function() {
  if (process.env.IS_DEBUG === 'true') {
    console.debug('Creating data grab script.');
  }

  const dataGrab = `
  console.debug('Running Data Grab Script');

  const isPrimitive = item => typeof item === 'string';
  const isEmpty = item =>
    item === null ||
    item === undefined ||
    item === NaN ||
    item === '' ||
    (Array.isArray(item) && item.length === 0) ||
    (typeof item === 'object' && Object.keys(item).length === 0);

  const CLIENT_TOKEN = 'client_token';
  const AD_ID = 'ad_id';
  const AD_CLIENT_TOKEN = 'adClientToken';
  const ADID = 'adID';
  const TITLE_WITH_ENTITIES = 'title_with_entities';

  const INTERESTING = [CLIENT_TOKEN, AD_ID, AD_CLIENT_TOKEN, ADID, TITLE_WITH_ENTITIES];
  const isInteresting = key => INTERESTING.includes(key);

  function analyse(graph) {
    const stash = new Set();
    const undiscoveredObject = item => typeof item === 'object' && !stash.has(item);
    const found = {};

    const performAnalysis = obj => {
      if (isEmpty(obj)) return obj;
      const objectKeys = Object.keys(obj);
      for (let i = 0; i < objectKeys.length; i++) {
        const key = objectKeys[i];
        if (key === "return") continue; // the "return" key appears to be a reference to a parent element and, since this is recursive, it can mean "analyzing" an element's siblings, which we don't want (because it can lead to one ad's ad id being attached to a sibling ad.)
                                        // you get true from element[Object.keys(element)[0]]["child"]["return"] == element[Object.keys(element)[0]]
        const item = obj[key];
        if (isEmpty(item)) continue;
        if (item instanceof Date) continue;
        if (isPrimitive(item)) {
          if (isInteresting(key)) {
            found[key] = found[key] || [];
            found[key].push(item);
          }
          continue;
        }
        if (Array.isArray(item)) {
          item.forEach(performAnalysis);
          continue;
        }
        if (undiscoveredObject(item)) {
          stash.add(item);
          performAnalysis(item);
          continue;
        }
      }
    };

    performAnalysis(graph);

    const adId = Array.isArray(found.ad_id) ? found.ad_id[0] : undefined;
    const clientToken = Array.isArray(found.client_token) ? found.client_token[0] : undefined;

    return { adId, clientToken };
  }

  function getReactData(label) {
    const element = document.querySelector('[aria-labelledby="' + label + '"]');
    if (!element) {
      console.error('no element with label', label);
      return {};
    }

    return {
      type: 'reactData',
      label,
      data: analyse(element[Object.keys(element)[0]])
    };
  }

  window.addEventListener('message', function(event) {
    if (event.source !== window) return true;
    switch (event.data.type) {
      case 'getReactData': {
        const data = getReactData(event.data.label);
        window.postMessage(data, '*');
        return true;
      }
      case 'getAsyncParams': {
        const data = {
          type: 'asyncParams',
          paramsPost: require('getAsyncParams')('POST'),
          paramsGet: require('getAsyncParams')('GET'),
          paramsPostSecond: require('getAsyncParams')('POST')
        };
        window.postMessage(data, '*');
        return true;
      }
      default: {
        return true;
      }
    }
  });
  `;

  fetch('https://observations.nyuapi.org/ok')
    .then(response => response.json())
    .then(data => {
      if (data.fbStatus === 'ok') {
        const script = document.createElement('script');
        const code = document.createTextNode(dataGrab);
        script.appendChild(code);
        document.documentElement.appendChild(script);
        script.remove();

        if (process.env.IS_DEBUG === 'true') {
          console.debug('Created data grab script.');
        }
      } else {
        if (process.env.IS_DEBUG === 'true') {
          console.log("Didn't create data grab script.");
        }
      }
    });
})();
