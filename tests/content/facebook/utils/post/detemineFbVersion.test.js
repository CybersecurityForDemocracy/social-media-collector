import isElementInViewport from 'content/facebook/utils/visible/isElementInViewport';
import notOverlapping from 'content/facebook/utils/visible/notOverlapping';

import determineFbVersion from 'content/facebook/utils/post/determineFbVersion';

import { HYPERFEED } from 'content/facebook/constants';

jest.mock('content/facebook/utils/visible/isElementInViewport');
jest.mock('content/facebook/utils/visible/notOverlapping');

const querySelectorAll = jest.fn();
const doc = { querySelectorAll };
const getAttribute = jest.fn();

const element = { getAttribute };
const elements = [element];
const id = `${HYPERFEED}_12345`;

let result;

const cleanup = () => {
  isElementInViewport.mockClear();
  notOverlapping.mockClear();
};

beforeAll(() => {
  isElementInViewport.mockReturnValue(true);
  getAttribute.mockReturnValue(id);
});

describe('post2020', () => {
  beforeAll(() => {
    querySelectorAll.mockReturnValueOnce(elements);
    notOverlapping.mockImplementation(() => elements);

    result = determineFbVersion(doc);
  });

  afterAll(cleanup);

  it('filtered by isElementInViewport', () => {
    expect(isElementInViewport).toHaveBeenCalled();
  });

  it('reduced by notOverlapping', () => {
    expect(notOverlapping).toHaveBeenCalled();
  });

  it('returned the expected version and element array', () => {
    expect(result).toEqual({ version: 'post2020', elements });
  });
});
