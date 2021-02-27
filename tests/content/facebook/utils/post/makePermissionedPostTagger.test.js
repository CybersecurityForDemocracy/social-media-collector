import * as posts from 'content/facebook/posts';
import post2020TagPostElement from 'content/facebook/ui/post2020/tagPostElement';

import makePermissionedPostTagger from 'content/facebook/utils/post/makePermissionedPostTagger';

jest.mock('content/facebook/posts');
jest.mock('content/facebook/ui/post2020/tagPostElement');

const id = '123456';
const elem = 'some element';
const permissions = { somePermission: true };

const cleanup = () => {
  posts.getSavedPost.mockClear();
  post2020TagPostElement.mockClear();
};

const doTest = (version, tagPostElement) => {
  describe(`given version ${version}`, () => {
    const tagPost = makePermissionedPostTagger(permissions, version);

    describe('when already tagged', () => {
      const post = { id, elem, isTagged: true };

      beforeAll(() => {
        posts.getSavedPost.mockReturnValue(post);
        tagPost(post);
      });

      afterAll(cleanup);

      it('did not call tagPostElement', () => {
        expect(tagPostElement).not.toHaveBeenCalled();
      });
    });

    describe('when not already tagged', () => {
      const post = { id, elem, isTagged: false };

      beforeAll(() => {
        posts.getSavedPost.mockReturnValue(post);
        tagPost(post);
      });

      afterAll(cleanup);

      it('called tagPostElement with post', () => {
        expect(tagPostElement).toHaveBeenCalledWith(post, permissions);
      });

      it('called updateAndSavePost with id and isTagged: true', () => {
        expect(posts.updateAndSavePost).toHaveBeenCalledWith({
          id,
          isTagged: true
        });
      });
    });
  });
};

[
  ['post2020', post2020TagPostElement]
].forEach(([version, tagPostElement]) => doTest(version, tagPostElement));
