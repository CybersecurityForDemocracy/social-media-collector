(function() {
  const monkeyPatchXhr = `
  const PATHS = ['/get_midroll_info?', '/watch?v='];

  const cleanAndParse = text => JSON.parse(text.replace('for (;;);', ''));

  const loadHandler = function() {
    if (
      !this.__xData ||
      !this.__xData.url ||
      (this.responseType !== 'text' && this.responseType !== '') ||
      !this.responseText
    )
      return;

    PATHS.forEach(path => {
      if (!this.__xData.url.includes(path)) return;

      let body;
      try {
        body = cleanAndParse(this.responseText);
      } catch (er) {
        console.debug('could not parse', this.responseText);
        console.error(er);
      }
      if (body) setTimeout(() => {
        const data = {
          body,
          url: this.__xData.url,
          hostUrl: window.location.href
        };
        console.debug('sending data from youtube page to content script', data);
        window.postMessage(data, '*');
      }, 250); // gives the content script time to register a listener.
    });
  };

  console.debug('monkey patching XHR');

  const { open, send } = XMLHttpRequest.prototype;

  XMLHttpRequest.prototype.open = function(_method, url) {
    this.__xData = { url: url.toLowerCase() };
    return open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function(_postData) {
    this.onload = loadHandler;
    return send.apply(this, arguments);
  };
  `;

  const inject = () => {
    const script = document.createElement('script');
    const code = document.createTextNode(monkeyPatchXhr);
    script.appendChild(code);
    document.documentElement.appendChild(script);
    script.remove();

    console.log('Injected XHR Monkey Patch script.');
  };

  fetch('http://localhost:5000/ok')
    .then(response => response.json())
    .then(data => {
      if (data.ytStatus === 'ok') {
        inject();
      } else {
        if (process.env.IS_DEBUG === 'true') {
          console.log("Didn't inject XHR Monkey Patch script.");
        }
      }
    });
})();
