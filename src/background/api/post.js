const { API_URL } = process.env;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const URL = `${API_URL}/observation`;

// function debugstring(payload) {
//   var ads = payload.items;
//   var s = '';
//   for (var i = 0; i < ads.length; ++i) {
//     s += ads[i].payload.adTargetingData.data.waist_advertiser_info.name;
//     s += ',';
//   }
//   return s;
// }

function hastargetingdata(payload) {
  var ads = payload.items;
  for (var i = 0; i < ads.length; ++i) {
    if (ads[i].payload.adTargetingData === undefined) {
      return false;
    }
  }
  return true;
}

/**
 *  General purpose utility to post data to the server.
 *
 *  @param payload — The data to send.
 *  @return JSON response data.
 */
const post = async payload => {
  const body = JSON.stringify(payload);
  const method = 'POST';
  var t1 = body.indexOf('platformItemId') >= 0;
  // console.debug('payload', t1, debugstring(payload), payload);
  console.debug('payload', t1, hastargetingdata(payload), payload);

  /* istanbul ignore if */
  if (!API_URL) {
    // running in offline mode.
    console.debug('running offline so no response received');
    return;
  }

  const metadata = { body, method, headers };
  const response = await fetch(URL, metadata);

  console.debug('server responded with status', response.status, response.statusText);
};

export default post;
