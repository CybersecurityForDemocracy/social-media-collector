import makeInitialPost2020Post from 'content/facebook/utils/post/post2020/makeInitialPost';
import determineFbVersion from 'content/facebook/utils/post/determineFbVersion';

import buildInitialPosts from 'content/facebook/utils/post/buildInitialPosts';

jest.mock('content/facebook/utils/post/determineFbVersion');
jest.mock('content/facebook/utils/post/post2020/makeInitialPost');

const querySelectorAll = jest.fn();
const doc = { querySelectorAll };
const elements = ['an element'];
const id = '12345';

describe('post2020', () => {
  beforeAll(() => {
    determineFbVersion.mockReturnValue({ version: 'post2020', elements });
    makeInitialPost2020Post.mockImplementation(elem => ({ id, elem }));
    buildInitialPosts(doc);
  });

  it('called determineFbVersion', () => {
    expect(determineFbVersion).toHaveBeenCalled();
  });

  it('called post2020 makeInitialPost', () => {
    expect(makeInitialPost2020Post).toHaveBeenCalled();
  });
});
