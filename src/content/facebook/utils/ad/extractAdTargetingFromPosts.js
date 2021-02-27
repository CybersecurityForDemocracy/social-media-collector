import inSequence from 'common/utils/inSequence';

import extractAdTargetingFromPost2020Post from './post2020/extractAdTargetingFromPost';

const extractAdTargetingFromPosts = async (posts, version) => {
  try {
    await posts.map(extractAdTargetingFromPost2020Post).reduce(inSequence, Promise.resolve());
  } catch (err) {
    console.debug('extractAdTargetingFromPosts', version, posts);
    console.error(err);
  }
};

export default extractAdTargetingFromPosts;
