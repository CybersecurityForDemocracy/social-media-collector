import isElementInViewport from '../visible/isElementInViewport';
import notOverlapping from '../visible/notOverlapping';

const DIV_HAS_ROLE_IS_ARTICLE = 'div [role="article"]';

const determineFbVersion = (/* istanbul ignore next */ doc = document) => {
  const elements = Array.from(doc.querySelectorAll(DIV_HAS_ROLE_IS_ARTICLE));
  return {
    elements: elements.filter(isElementInViewport).reduce(notOverlapping, []),
    version: 'post2020'
  };
};

export default determineFbVersion;
