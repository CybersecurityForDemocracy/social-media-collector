import extractAdTargetingFromPosts from 'content/facebook/utils/ad/extractAdTargetingFromPosts';
import extractAdIdFromPosts from 'content/facebook/utils/ad/extractAdIdFromPosts';
import * as posts from 'content/facebook/posts';
import sendPosts from 'content/facebook/utils/post/sendPosts';
import reportPosts from 'content/facebook/utils/post/reportPosts';

import {
  makeFilteredFlagPostAsProcessed,
  makeFilteredApplyAdTargeting,
  makeFilteredApplyAdId,
  makeFilteredPostSender,
  makeFilteredPostReporter
} from 'content/facebook/utils/post/makeFilteredProcess';

jest.mock('content/facebook/utils/ad/extractAdTargetingFromPosts');
jest.mock('content/facebook/utils/ad/extractAdIdFromPosts');
jest.mock('content/facebook/posts');
jest.mock('content/facebook/utils/post/sendPosts');
jest.mock('content/facebook/utils/post/reportPosts');

const filterFn = () => true;

const cleanup = () => {
  posts.updateAndSavePost.mockClear();
  extractAdTargetingFromPosts.mockClear();
  extractAdIdFromPosts.mockClear();
  posts.getSavedPost.mockClear();
};

const id = '123456';
const post = { id };

describe('makeFilteredFlagPostAsProcessed', () => {
  beforeAll(() => {
    const processed = makeFilteredFlagPostAsProcessed(filterFn);
    processed([post]);
  });

  afterAll(cleanup);

  it('called updateAndSavePost with expected', () => {
    expect(posts.updateAndSavePost).toHaveBeenCalledWith({
      ...post,
      isProcessed: true
    });
  });
});

describe('makeFilteredPostSender', () => {
  beforeAll(() => {
    posts.getSavedPost.mockReturnValue(post);
    const processed = makeFilteredPostSender(filterFn);
    processed([post]);
  });

  afterAll(cleanup);

  it("called getSavedPost with the post's id", () => {
    expect(posts.getSavedPost).toHaveBeenCalledWith(id);
  });

  it('called sendPosts with the posts', () => {
    expect(sendPosts).toHaveBeenCalledWith([post]);
  });
});
