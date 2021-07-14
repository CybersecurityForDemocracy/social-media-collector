/* eslint-disable */
// Sorry eslint, please ignore this file for me. I just wanna test.

function isNodeJS() {
  return typeof window === 'undefined';
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
  if (isNodeJS()) {
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
    const r = />[ ]?(\d+[.]?\d?K?M?)[ ]?[sS]hares?[ ]?</;
    const m = item.payload.contentHtml.match(r);
    if (m) {
      return fbNumStrToInt(m[1]);
    }
    return 0;
  },

  get_comment_count: function(item) {
    const r = />[ ]?(\d+[.]?\d?K?M?)[ ]?[cC]omments?[ ]?</;
    const m = item.payload.contentHtml.match(r);
    if (m) { return fbNumStrToInt(m[1]); }
    return 0;
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

    var pfb = item.parser.querySelectorAll("span._3nlk")
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

  get_author_link: function(item) {
    var author_link = item.parser.querySelectorAll(".fwb a");
    if (author_link.length) {
      var link = author_link[0].getAttribute('href').split("?")[0]
      return link
    }
  },

  get_user_content: function(item) {
    /*Parse user content from contentHtml using selectolax. Selectolax is much more efficient
    compared to Beautifulsoup (bs4). This method returns a list of user content sections. There
    are usually only one but if there are more than one, the first element is usually null (empty string).

    */
    var userContent_divs = item.parser.querySelectorAll('[dir="auto"]')
    //logging.debug(f"userContent div classes found: {len(userContent_divs)}")
    var user_content_pieces = [];

    // Process each div that has a userContent class and include them in the
    // user_content_pieces list if they are not null ('')
    for (let div of userContent_divs) {

      // Skip any elements that has a nested [dir="auto"]
      if (div.querySelectorAll('[dir="auto"]').length > 0) {
        continue;
      }

      var ad_text = div.textContent;
      if (ad_text && ad_text.length > 0) {
        var p1 = /^\d*[.]?\d?K?M? ?[Ss]hares?$/;
        var p2 = /^\d+[.]?\d?K?M? [Cc]omments?$/;
        var p3 = /^\d+[.]?\d?K?M? [lL]ikes?$/;
        if (!ad_text.match(p1) && !ad_text.match(p2) && !ad_text.match(p3) &&
          ad_text !== 'Like' && ad_text !== 'Comment') {
          user_content_pieces.push(ad_text);
        }
      }
    }

    userContent_divs = item.parser.querySelectorAll('div.userContent')
    for (let div of userContent_divs) {
      var ad_text = div.textContent;
      if (ad_text && ad_text.length > 0) {
        user_content_pieces.push(ad_text);
      }
    }

    // if (!user_content_pieces.length) {
    //   logging.warning("Unable to find any user content pieces within contentHtml")
    // }

    // The first two elements are: "<advertiser name>" and "Sponsored", so
    // the slice(2) removes them.
    return user_content_pieces.slice(2);
    // return user_content_pieces;
  },

  get_user_content_wrapper: function(item) {
    /*Parse user content wrapper from contentHtml. This is the full content of the ad text
    */
    var user_content_wrapper = item.parser.querySelectorAll("div.userContentWrapper");
    if (user_content_wrapper.length) {
        return user_content_wrapper[0].innerText;
    }
    //logging.warning("Unable to parse the user content or it is not present.")
    return '';
  },

  get_story_attachment_image: function(item) { // -> list:
    /*Parse out the images from the ad within the contentHtml. This method returns
    a list of objects that includes metadata for the image. Common fields returned are:

    height:     Image height
    width:      Image width
    alt:        Image alt field
    src:        Image source
    data-src:   Appears to be the same information as src
    class:      Image category (e.g. scaledImageFitWidth)

    Note:       Image src links appear to have an expiration time. When attempting to fetch
                an image after this expiration time, Facebook returns a "URL signature expired" error.
    */

    var images = [];
    var story_attachment_images = item.parser.querySelectorAll("img");
    var pattern = /scontent-?.*.(?:xx|fna).fbcdn.net\//;
    for (let image of story_attachment_images) {
      var m = image.getAttribute('src').match(pattern);
      if (m) {
        // First way of getting width.
        var w = parseFloat(image.getAttribute('width'));
        if (!isNaN(w) && w < 50) {
          // Too small of an image is probably a profile picture, not relevant
          // to the ad.
          continue;
        }

        // Alternate way of getting width.
        var m2 = image.getAttribute('src').match(/\/p(\d+)x(\d+)\//);
        var w, h;
        if (m2) {
          w = m2[1];
          h = m2[2];
          if (w < 50) {
            continue;
          }
        }

        // Add the image if it doesn't meet any of these.
        images.push(image);
      }
    }

    if (!story_attachment_images.length) {
        //logging.debug("No fbStoryAttachmentImage classes found in contentHtml")
    }

    return images;
  },

  extract_ft_values: function(item) {
    /*Extract values for each ft element within the contentHtml field
    */
    if (!item.ft_keys) {
      extract_ft_keys(item);
    }

    var t = item.payload.contentHtml;

    for (let ft_element of Object.keys(item.ft_keys)) {
      if (ft_element === 'page_insights') {
        // Test cases:
        //   t = `ft[page_insights][1][u]=asdf&`
        //   // Python: [('[u]', 'asdf')]
        //   // JS: [('[u]', 'asdf')]
        // objs = re.findall(r"ft\[page_insights\]\[\d+\](\[.*?\])=(.*?)(?:&)",
        //   self.contentHtml, re.MULTILINE)
        var objs = [...t.matchAll(/ft\[page_insights\]\[\d+\](\[.*?\])=(.*?)(?:&)/gm)];

        for (let obj of objs) {
          // TODO: dblchk this group capturing works.
          var key = "page_insights" + obj[1].replace("][",".").replace("[",".").replace("]","") // Not very elegant
          var value = obj[2];
          item.ft[key] = value;
        }
      } else {
        // TODO: dblchk this works. Original:
        // value = re.search(f"ft\[{ft_element}\]=(.*?)(?:&)", self.contentHtml,
        //   re.MULTILINE)
        // Test cases:
        //   t = `ft[random]=asdf&`
        var r = new RegExp(`ft\\[${ft_element}\\]=(.*?)(?:&)`, 'm');
        var value = t.match(r);
        if (value) {
          item.ft[ft_element] = value[1];
        }
      }
    }
  },

};
const bep = BrowserExtensionParser; // Abbreviated.

function extract_ft_keys(item) {
  /*Extract individual fb elements. These elements start with ft and are followed by brackets
  for the corresponding key. For example, ft[qid] contains the Facebook advertisement id for the ad
  being parsed. A full list of fields can be extracted using regex (in this situation, regex can work
  well for a given HTML code piece with a known structure.
  */

  /*This finds all of the corresponding ft elements within the contentHtml key that is returned by the
  browser extension. The purpose of many of these key fields is unknown, but it is worth extracting them
  anyway since they are available.*/

  // TODO: doublecheck this regexp works.
  // Test cases:
  //   t = `ft[page_insights][1][u]=asdf&`
  var t = item.payload.contentHtml;
  var ft_elements = [...t.matchAll(/ft\[(.*?)\]/gm)];

  item.ft_keys = {};
  for (let element of ft_elements) {
    item.ft_keys[element[1]] = true;
  }
}

// The pythonic equivalent is
//  [src['src'] for src in item_data['ad_images_metadata']];
function getimgsrcs(imgs) {
  var result = [];
  for (let image of imgs) {
    var src = image.getAttribute('src');
    result.push(src);
  }
  return src;
}

function get_waist_targeting_fields() {
  return ['age_max', 'age_min', 'description', 'dfca_data', 'edu_status', 'gender', 'interests', 'locales', 'location_name', 'location_type', 'mobile_ca_data', 'name', 'type', 'waist_ui_type', 'website_ca_data', 'serialized_data', 'job_title', 'employer_name', 'school_names', 'merchant_name', 'relationship_status'];
}

// This just gets the records that explicitly extracts the fields.
function process_waist_targeting_data(item) {
  var waist_records = [];
  let targeting_fields = get_waist_targeting_fields();
  for (let waist of item['payload']['adTargetingData']['data']['waist_targeting_data']) {
    let current_record = {'ad_id': parseInt(item['platformItemId'], 10) };
    for (let field of targeting_fields) {
      if (waist[field]) {
        current_record[field] = waist[field];
      } else {
        current_record[field] = null;
      }
    }

    // Stringify these fields.
    for (let key of ['interests','mobile_ca_data','dfca_data','website_ca_data']) {
      if (current_record[key]) {
        current_record[key] = JSON.stringify(current_record[key]);
      }
    }

    // console.log('waist item', item['platformItemId'], waist);
    // console.log('current_record', current_record);
    waist_records.push(current_record);
  }
  return waist_records;
}

// This is all from parse_facebook_observation.py 'process_facebook_item'.
function process_facebook_item(item) {
  // Initialize item data dict for insertion into observations database table.
  var item_data = {};

  let waist_records = process_waist_targeting_data(item);

  // console.log('d1 item', item);
  item.parser = newparser(item.payload.contentHtml);
  item.ft = {}

  // Parse item id
  item_data['item_id'] = item.id;

  // Parse share and comment counts. (If these counts are not available, the
  // value returned is null)
  item_data['share_count'] = bep.get_share_count(item);
  item_data['comment_count'] = bep.get_comment_count(item);

  // Parse paid_for_by data
  item_data['paid_for_by'] = bep.get_paid_for_by(item);

  // Parse author link
  item_data['author_link'] = bep.get_author_link(item);

  // Parse User Content (this returns a list of user content pieces)
  var user_content_pieces = bep.get_user_content(item);
  item_data['user_content'] = user_content_pieces.join("\n");

  // Parse User Content Wrapper
  item_data['user_content_wrapper'] = bep.get_user_content_wrapper(item)

  // Parse Ad Images (Returns a list of objects)
  item_data['ad_images_metadata'] = bep.get_story_attachment_image(item)

  // Fetch Ad Images data
  var images_data = []
  item_data['alt_text'] = ""
  for (let image of item_data['ad_images_metadata']) {
    var src = image.getAttribute('src');
    // orig was 'alt_text'. Doublecheck 'alt' was the right version.
    if (image.getAttribute('alt')) {
      item_data['alt_text']+=image.getAttribute('alt')+"\n"
    }
    //image_data = bep.fetch_image(src)
    //if image_data is not None:
    //    images_data.append(image_data)
  }
  item_data['ad_images_data'] = null; //images_data

  // Parse Ad Targeting data
  //waist_targeting_data = process_waist_targeting_data(item)

  // Create Observation Record for insertion into the observations table
  var observation_data = {};
  observation_data['item_id'] = item['itemId'];
  observation_data['ad_id'] = item['platformItemId'];
  observation_data['share_count'] = item_data['share_count'];
  observation_data['comment_count'] = item_data['comment_count'];
  observation_data['observed_at'] = item.observedAt;
  observation_data['targets'] = null;
  observation_data['country_code'] = "";
  // TODO: need to pass observation_metadata to this function.
  // if 'countryCode' in observation_metadata:
  //     observation_data['country_code'] = observation_metadata['countryCode'];

  // TODO: need to understand what is the corollary. This inserts into sql db.
  // insert_observation(observation_data,conn);

  // Extract ad ft key values
  bep.extract_ft_values(item);

  // Create Ad Record for insertion into the ads table
  var ad_data = {};
  ad_data['id'] = observation_data['ad_id'];
  ad_data['html'] = item.payload.contentHtml;
  ad_data['images'] = getimgsrcs(item_data['ad_images_metadata']);
  ad_data['alt_text'] = "";
  if (item_data.alt_text) { ad_data.alt_text = item_data.alt_text; }
  // Get advertiser and thumbnail data if present
  ad_data.advertiser = '';
  ad_data.thumbnail = '';
  if (item['payload']['adTargetingData']) {
    ad_data['advertiser'] = item['payload']['adTargetingData']['data']['waist_advertiser_info']['name'];
    ad_data['thumbnail'] = item['payload']['adTargetingData']['data']['waist_advertiser_info']['profile_picture_url'];
  }
  ad_data['message'] = item_data['user_content'];

  // TODO: need to pass observation_metadata to this function.
  // if (observation_metadata.languageCode) {
  //   ad_data['lang'] = observation_metadata['languageCode'];
  // } else {
  //   //logging.warning("languageCode is missing from observation metadata")
  //   ad_data['lang'] = "Unavailable";
  // }

  ad_data['page'] = item_data['author_link'];
  ad_data['paid_for_by'] = item_data['paid_for_by'];

  // Parse call_to_action_type field if available.
  // Below python code was never working. I fixed it by getting the last text
  // in the ad message.
  // ad_data['call_to_action_type'] = item.ft['call_to_action_type'];
  ad_data['call_to_action_type'] = user_content_pieces.slice(-1)[0];

  // Parse page id from ft fields if available
  ad_data['page_id'] = null;
  if (item.ft.page_id) {
    ad_data['page_id'] = bep.ft['page_id'];
  } else if (item['payload']['adTargetingData']['data']['waist_advertiser_info'].advertiser_id) {
    ad_data['page_id'] = item['payload']['adTargetingData']['data']['waist_advertiser_info']['advertiser_id'];
  }

  // Parse Ad creation time from ft.page_insights.post_context.publish_time
  ad_data['created_at'] = null;
  if (item.ft['page_insights.post_context.publish_time']) {
    ad_data['created_at'] = bep.ft['page_insights.post_context.publish_time'];
  }

  //logging.info(f"{len(ad_data['images'])} images to process")

  //PUll images
  for (var i = 0; ad_data['images'] && i < ad_data['images'].length; ++i) {
    var image_url = ad_data['images'][i];
    // TODO: doublecheck that we port upload_image correctly.
    // var image_bucket_path = upload_image(image_url, bucket_client)
    // if len(image_bucket_path) > 0:
    //     ad_data['images'][i] = image_bucket_path
    //     insert_image_mappings(conn,image_url,image_bucket_path)
  }
  ad_data['thumbnail'] = item['payload']['adTargetingData']['data']['waist_advertiser_info']['profile_picture_url'];

  var thumbnail_url = ad_data['thumbnail'];
  // TODO: doublecheck that we port upload_image correctly.
  // var thumbnail_bucket_path = upload_image(thumbnail_url, bucket_client);
  // if len(thumbnail_bucket_path) > 0:
  //     insert_image_mappings(conn,thumbnail_url,thumbnail_bucket_path)
  //     ad_data['thumbnail'] = thumbnail_bucket_path


  //insert_ad(ad_data,conn);

  return {item_data, ad_data, waist_records};
}

function process_fb_observation(observation) {
  const metadata = observation.metadata;
  const parsed_observations = [];
  for (let item of observation.items) {
    if (item_is_ad(item)) {
      const parsed_obs = process_facebook_item(item, metadata);
      parsed_observations.push(parsed_obs);
      // console.log(parsed_obs);
    }
  }
  return parsed_observations;
}

function test_observation(testcase) {
  console.log(JSON.stringify(process_fb_observation(testcase), null, 2));
}

function main(testcases) {
  // test_observation(testcases[0]);
  // test_observation(testcases[1]);
  // test_observation(testcases[2]);
  // test_observation(testcases[3]);
  // test_observation(testcases[4]);
  test_observation(testcases[5]);
  // test_observation(testcases[6]);
}

// Run only in nodejs.
if (isNodeJS()) {
  var testcases = [
    // Sorry didn't take notes for this one. This is from running the parser.
    // Has 7 comments, 2 shares.
    //
    // message: '"ClickCease helps me MAXIMIZE my Google Ads spend on REAL potential customers rather than wasting it on bots."\n' +
    //    ' Excellent. 4.9 on SourceForge\n' +
    //    'clickcease.com\n' +
    //    'Protect Your Google Ads Budget Now!\n' +
    //    'Sign Up and start your 7 days free trial\n' +
    //    'Sign Up',
    require('./observation.json'),

    // This is a motion video ad. There are 0 shares. 0 comments. 9 likes.
    // Video ad means there are no images.
    //
    // message: 'Motion’s distraction blocker protects your focus time, so your brain can stay fresh and do its best work.\n' +
    //    'USEMOTION.COM\n' +
    //    'Bye bye brain drain.\n' +
    //    'Learn More',
    require('./obs2.json'),

    // This is a Jarvis AI video ad. There are 42 comments, 1 share.
    // message: 'Conversion.ai is a groundbreaking new tool that uses AI to write high performing marketing copy for your business. Get started for free now.\n' +
    //    'CONVERSION.AI/FREE-TRIAL\n' +
    //    'Get more clicks with AI-powered copywriting\n' +
    //    'Use AI to create better ads in 1 minute' +
    //    'Download',
    require('./obs3.json'),

    // This is a Avail video ad. 0 comments. 0 likes.
    // message: "Whether you're working from home or heading out of town, earn extra money by sharing your car with Avail. \n" +
    //    'Park for free & come back to a sparkling clean car, plus cash if your car was shared. Your car is covered by Allstate insurance the entire time you’re… See More\n' +
    //    'AVAILCARSHARING.COM\n' +
    //    'Share Your Car & Earn Big\n' +
    //    'Learn More'
    require('./obs4.json'),

    require('./obs5.json'),

    require('./obs6.json'),

    require('./obs7.json'),
  ];
  main(testcases);
}

export default process_fb_observation;
