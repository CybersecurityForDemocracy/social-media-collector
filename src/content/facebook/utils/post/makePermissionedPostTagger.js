import { getSavedPost, updateAndSavePost } from '../../posts';
import post2020TagPostElement from '../../ui/post2020/tagPostElement';

/**
 *  Injects a small DIV into the DOM above the post's `elem`.
 *
 *  @param post — from which we use the `id` to pull the latest saved
 *  version of the post.
 */
const makePermissionedPostTagger = (permissions, _version) => {
  return ({ id }) => {
    const post = getSavedPost(id);
    const { isTagged, elem } = post;
    if (isTagged) {
      console.debug('post already tagged', elem);
      return;
    }

    post2020TagPostElement(post, permissions);

    updateAndSavePost({ id, isTagged: true });
  };
};

export default makePermissionedPostTagger;
