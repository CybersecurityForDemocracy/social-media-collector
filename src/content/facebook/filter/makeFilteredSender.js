import {
  makeFilteredFlagPostAsProcessed,
  makeFilteredPostSender
} from '../utils/post/makeFilteredProcess';

const makeFilteredSender = ({
  filters: { canShareSponsored, canSharePublicUser, canSharePublicPage }
}) => {
  const sendSponsored = makeFilteredPostSender(canShareSponsored);
  const sponsoredProcessed = makeFilteredFlagPostAsProcessed(canShareSponsored);

  const sendPublicUser = makeFilteredPostSender(canSharePublicUser);
  const publicUserProcessed = makeFilteredFlagPostAsProcessed(canSharePublicUser);
  const sendPublicPage = makeFilteredPostSender(canSharePublicPage);
  const publicPageProcessed = makeFilteredFlagPostAsProcessed(canSharePublicPage);

  return async posts => {
    await sendSponsored(posts).then(async function() {
      console.log('d3.1', posts);
      sponsoredProcessed(posts);
      console.log('d3.2', posts);
    });
    await sendPublicUser(posts).then(async () => publicUserProcessed(posts));
    await sendPublicPage(posts).then(async () => publicPageProcessed(posts));
  };
};

export default makeFilteredSender;
