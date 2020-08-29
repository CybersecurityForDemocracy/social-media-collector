import {
  makeFilteredApplyAdTargeting,
  makeFilteredApplyAdId
} from '../utils/post/makeFilteredProcess';

// // Filter out the posts that have missing platformItemId or ad targeting info.
// function filterPostsMissingInfo(posts) {
//   var result = [];
//   for (var i = 0; i < posts.length; ++i) {
//     if (!posts[i].platformItemId || posts[i].) {
//     }
//   }
//   return result;
// }

const makeFilteredAdInfoApplicator = ({
  filters: { canShareAdTargeting, cannotShareAdTargeting },
  version
}) => {
  const applyAdTargeting = makeFilteredApplyAdTargeting(canShareAdTargeting, version);
  const applyAdId = makeFilteredApplyAdId(cannotShareAdTargeting, version);

  return async posts => {
    console.log('d2.1', posts);
    var result = Promise.all([applyAdTargeting(posts), applyAdId(posts)]);
    result.then(function() {
      console.log('d2.2', posts, arguments);
    });
    return result;
  };
};

export default makeFilteredAdInfoApplicator;
