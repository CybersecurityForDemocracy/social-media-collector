import { sendToBackground } from 'messaging';
import { UPLOAD_POSTS } from 'common/actions';
import datesToISO from 'common/utils/datesToISO';

import { loadArchiveIndex, addItemsToArchive } from 'common/storage/archive';
import trimPost from './trimPost';

// Returns false if is ad but has missing info.
// Returns true in all other cases. Including if `post` is not an ad.
function ifAdMustHaveInfo(post) {
  if (post.itemType !== 'sponsoredPost') {
    return true;
  }
  // Must have platformItemId and adTargetingData.
  if (!!post.platformItemId && !!post.payload.adTargetingData) {
    return true;
  }
  return false;
}

/**
 *  Sends the posts to the background.
 *
 *  @param posts — The array of posts to send.
 */
export const sendPosts = async posts => {
  console.log('sendPosts.1', posts);
  if (!Array.isArray(posts) || !posts.length) return;
  const existing = await loadArchiveIndex();

  // Filter out posts already in the archive.
  const trimmed1 = posts.map(trimPost).filter(({ id }) => !existing.includes(id));

  console.log('sendPosts.2', trimmed1);

  // Filter out sponsored posts that don't have the right info.
  const trimmed2 = trimmed1.filter(ifAdMustHaveInfo);

  if (!trimmed2.length) return;

  console.log('sendPosts.3', trimmed2);

  await addItemsToArchive(trimmed2);

  console.log('sendPosts.4', trimmed2);

  return sendToBackground(UPLOAD_POSTS, trimmed2.map(datesToISO));
};

export default sendPosts;
