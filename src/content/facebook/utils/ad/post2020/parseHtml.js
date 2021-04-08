function is_nodejs() {
  return (typeof window === 'undefined');
}

// Determine if item is an actual Facebook ad
function item_is_ad(item) {
  // Get the html
  if (item.payload) {
    if (item.payload.contentHtml) {
      var contentHtml = item['payload']['contentHtml'];
    } else {
      // Commented out because would be too verbose.
      //console.error("contentHtml is missing for Facebook item.");
      return false
    }
  } else {
    // Commented out because would be too verbose.
    //console.error("Payload key is missing for Facebook item.");
    return false;
  }

  if (item.payload.adTargetingData) {
    return true;
  }

  return false
}

function fbNumStrToInt(s) {
  const z = s.length-1;
  if (s[z] === 'K') {
    return parseFloat(s.substring(0, z)) * 1e3;
  }
  if (s[z] === 'M') {
    return parseFloat(s.substring(0, z)) * 1e6;
  }
  return parseInt(s, 10);
}

// Taken from https://stackoverflow.com/a/494348
function newparser(htmlString) {
  if (is_nodejs()) {
    var jsdom = require('jsdom');
    var parser = (new jsdom.JSDOM(htmlString)).window.document;
    return parser;
  }
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

const BrowserExtensionParser = {
  get_share_count: function(item) {
    const r = />(\d+[.]?\d?K?M?) [sS]hares?</;
    const m = item.payload.contentHtml.match(r);
    if (m) {
      return fbNumStrToInt(m[1]);
    }
    return undefined;
  },

  get_comment_count: function(item) {
    const r = /> (\d+[.]?\d?K?M?)[cC]omments?</;
    const m = item.payload.contentHtml.match(r);
    if (m) {
      return fbNumStrToInt(m[1]);
    }
    return undefined;
  },

  // TODO: need to have a valid test case for this section.
  get_paid_for_by: function(item) {
    /*
      Parse out the paid_for_by information from the HTML.

      The span class for paid for information is _3nlk. If the first span element has text
      matching "sponsored" then the following element with the same class will contain the
      paid_for_by information.
    */
    // Parse the author_link (page) information
    const r = />[^<]*[sS]ponsored[^<]*[pP]aid [fF]or [bB]y ([^<]*)</;
    const m = item.payload.contentHtml.match(r);
    if (m) {
      return m[1];
    }

    pfb = item.parser.querySelectorAll("span._3nlk")
    var i = 0;
    for (let el of pfb) {
      if (el.innerText.toLowerCase().trim() === "sponsored") {
        return pfb[i+1].innerText;
      }
      ++i;
    }

    // Couldn't find any.
    return undefined;
  },

};
const bep = BrowserExtensionParser; // Abbreviated.

function process_facebook_item(item) {
  // Initialize item data dict for insertion into observations database table.
  var item_data = {};

  item.parser = newparser(item.payload.contentHtml);

  // Parse item id
  item_data['item_id'] = item.id;

  // Parse share and comment counts. (If these counts are not available, the
  // value returned is null)
  item_data['share_count'] = bep.get_share_count(item);
  item_data['comment_count'] = bep.get_comment_count(item);

  // Parse paid_for_by data
  item_data['paid_for_by'] = bep.get_paid_for_by(item);

  // TODO: more parsing from parse_facebook_observation.py, L147

  return item_data;
}

function process_observation(observation) {
  let metadata = observation.metadata;
  for (let item of observation.items) {
    if (item_is_ad(item)) {
      var item_data = process_facebook_item(item, metadata);
      console.log(item_data);
    }
  }
}

function main(testcase1) {
  var testcase1 = require("./observation.json");
  process_observation(testcase1);
}
main();
