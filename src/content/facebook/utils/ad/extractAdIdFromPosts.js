import inSequence from 'common/utils/inSequence';
import extractAdIdFromPost2020Post from './post2020/extractAdIdFromPost';

/**
 *  Walks through the supplied array of posts, in sequence,
 *  and extracts adIds for each one, if possible.
 *
 *  @param posts — An array of posts.
 *  @sideeffect The posts data stored in local cache is updated by extractAdIdFromPost
 */
const extractAdIdFromPosts = async (posts, _version) => {
  try {
    await posts.map(extractAdIdFromPost2020Post).reduce(inSequence, Promise.resolve());
  } catch (err) {
    console.error('error in extractAdIdFromPosts', err);
  }
};

export default extractAdIdFromPosts;
