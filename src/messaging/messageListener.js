import { handleRequest } from './registry';

/**
 *  Listener attached to the browser that listens for messages from the
 *  content script and handles them accordingly.
 *
 *  @param req — The request from the content script.
 *  @param _sender — where did the message come from. (ignored)
 *  @param sendResponse — a function supplied by the browser that handles the response.
 *  @returns true
 */
const messageListener = (req, _sender, sendResponse) => {
  console.log('messageListener', req, _sender);

  handleRequest(req)
    .then(sendResponse)
    .catch(err => {
      console.debug('caught error handling request', req);
      console.error(err);
      sendResponse();
    });

  return true;
};

export default messageListener;
