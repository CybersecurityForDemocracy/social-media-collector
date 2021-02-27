import extractAdTargetingFromPost2020Post from 'content/facebook/utils/ad/post2020/extractAdTargetingFromPost';
import extractAdTargetingFromPosts from 'content/facebook/utils/ad/extractAdTargetingFromPosts';

import { VERSION } from 'content/facebook/constants';

jest.mock('content/facebook/utils/ad/post2020/extractAdTargetingFromPost');

const posts = ['some', 'post'];

const cleanup = () => {
  extractAdTargetingFromPost2020Post.mockReset();
};

const doTest = version => {
  describe(`when version is ${version}`, () => {
    const extractAdTargetingFromPost = extractAdTargetingFromPost2020Post;

    describe('when it works', () => {
      beforeAll(async () => {
        extractAdTargetingFromPost.mockResolvedValue();
        await extractAdTargetingFromPosts(posts, version);
      });

      afterAll(cleanup);

      it('called extractAdTargetingFromPost twice', () => {
        expect(extractAdTargetingFromPost).toHaveBeenCalledTimes(posts.length);
      });
    });

    describe('when it fails', () => {
      const error = new Error('oops');

      beforeAll(async () => {
        extractAdTargetingFromPost.mockImplementation(() => {
          throw error;
        });

        await extractAdTargetingFromPosts(posts, version);
      });

      afterAll(cleanup);

      it('called extractAdTargetingFromPost once', () => {
        expect(extractAdTargetingFromPost).toHaveBeenCalledTimes(1);
      });
    });
  });
};

Object.values(VERSION).forEach(doTest);
