import extractAdTargetingFromPosts from '../ad/extractAdTargetingFromPosts';
import extractAdIdFromPosts from '../ad/extractAdIdFromPosts';
import { getSavedPost, updateAndSavePost } from '../../posts';
import sendPosts from './sendPosts';
import reportPosts from './reportPosts';

/**
 *  Return a function that filters the posts and then flags them as processed.
 *
 * @param {Function} filterFn — a filter function.
 * @return {Function} a function that flags the filtered posts as processed
 * @sideeffect The updated post is saved to the `ALL_POSTS` set.
 */
export const makeFilteredFlagPostAsProcessed = filterFn => {
  return posts => {
    const process = ({ id }) => updateAndSavePost({ id, isProcessed: true });

    posts.filter(filterFn).forEach(process);
  };
};

/**
 *  Return a function that filters the posts and then applies ad targeting data to them.
 *
 * @param {Function} filterFn — a filter function.
 * @param {String} version — just 'post2020' for now..
 * @return {Function} a Promise that resolves to undefined, or rejects with an error.
 * @sideeffect The updated post is saved to the `ALL_POSTS` set.
 */
export const makeFilteredApplyAdTargeting = (filterFn, version) => async posts =>
  extractAdTargetingFromPosts(posts.filter(filterFn), version);

/**
 *  Return a function that filters the posts and then applies adId to them.
 *
 * @param {Function} filterFn — a filter function.
 * @param {String} version — just 'post2020' for now..
 * @return {Function} a function that applies adId data to the filtered posts
 * @sideeffect The updated post is saved to the `ALL_POSTS` set.
 */
export const makeFilteredApplyAdId = (filterFn, version) => async posts =>
  extractAdIdFromPosts(posts.filter(filterFn), version);

/**
 *  Returns a function that gets the saved post with the matching id
 *  filters according to the supplied filter, then sends it to the back end.
 *
 * @param {Function} filterFn — a filter function.
 * @param {String} version — just 'post2020' for now..
 * @return {Function} a function that tags the post in the ui appropriately.
 * @sideeffect The updated post is saved to the `ALL_POSTS` set.
 */
export const makeFilteredPostReporter = (filterFn, version) => async (posts, permissions) =>
  reportPosts(posts.map(({ id }) => getSavedPost(id)).filter(filterFn), permissions, version);

/**
 *  Returns a function that gets the saved post with the matching id
 *  filters according to the supplied filter, then sends it to the back end.
 *
 * @param {Function} filterFn — a filter function.
 * @return {Function} a function that sends the saved post with the matching id to the background.
 * @sideeffect The updated post is saved to the `ALL_POSTS` set.
 */
export const makeFilteredPostSender = filterFn => async posts =>
  sendPosts(posts.map(({ id }) => getSavedPost(id)).filter(filterFn));
