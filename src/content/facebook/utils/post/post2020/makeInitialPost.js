import { updateAndSavePost, getSavedPost } from '../../../posts';
import makeItemId from 'common/utils/makeItemId';
import sanitizePostContent from '../sanitizePostContent';
import getPosterData from './getPosterData';
import isPublicPost from './isPublicPost';
import isSponsoredPost from './isSponsoredPost';
import { VERSION } from '../../../constants';

const innerify = element => {
  if (element.querySelector('.userContentWrapper')) {
    return element.querySelector('.userContentWrapper');
  } else {
    return element;
  }
};

/**
 *  Given a post element make a fleshed out post object.
 *
 * @param element — a post's element.
 * @return an initialised post, or null if a post can not be created.
 * @sideeffect The post is saved to the `ALL_POSTS` set.
 */
const makeInitialPost = element => {
  console.log('guo: post2020');

  console.debug('element', element);
  const elem = element.querySelector('div'); // use the first inner div.
  const { isUserPost, ...posterData } = getPosterData(elem);

  const idElt = element.querySelector('div[id]');
  if (!idElt) return null; // nulls are filtered out by the caller (buildInitialPosts)

  const id = idElt.getAttribute('id');
  if (!id) return null;

  const saved = getSavedPost(id);
  if (saved) return saved;

  const fresh = {
    // meta data used internally
    elem,
    isInFeed: true,
    isTagged: false,
    isProcessed: false,
    // fbDtsg: getFbDtsgFromPostElement(elem), // not used.
    isPublic: isPublicPost(elem),
    isSponsored: isSponsoredPost(elem),
    isUserPost,
    ...posterData,
    adId: null,
    // the below is sent to the server.
    id,
    platform: 'facebook',
    version: VERSION.POST_2020,
    itemId: makeItemId(),
    observedAt: new Date().getTime(),
    payload: {
      contentHtml: sanitizePostContent(innerify(elem).outerHTML, isUserPost)
    },
    // these get filled in later
    itemType: null,
    platformItemId: null
  };
  console.debug('data', fresh);
  return updateAndSavePost(fresh);
};

export default makeInitialPost;
