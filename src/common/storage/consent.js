import { CONSENT, CONSENT_ACCEPTED_AT, CONSENT_VIEWED_AT } from 'common/keys';
import { getItem, setItem } from '.';

export const CURRENT_CONSENT_VERSION = Number(process.env.CONSENT_VERSION);

/**
 *  Get the timestamp associated with the latest consent to be granted.
 *
 *  @return the timestamp for when the consent was granted.
 */
export const getConsentAcceptedAt = async () => getItem(CONSENT_ACCEPTED_AT);

/**
 *  Get the timestamp associated with the latest consent to be granted.
 *
 *  @return the timestamp for when the consent was granted.
 */
export const getConsentViewedAt = async () => getItem(CONSENT_VIEWED_AT);

/**
 *  Check the consent to see if it's been granted, defaults to 0.
 *  0: no consent has been granted
 *  1: the original extension's consent has been granted
 *  n: consent versions will be numeric from now on.
 *
 *  @return a consent version number. 0 means no consent has been granted.
 */
export const checkConsent = async () => {
  const consent = await getItem(CONSENT, 0);

  const t = typeof consent;
  if (t !== 'number' && t !== undefined && consent !== null) {
    console.error(
      'Consent type should be a number or undefined or null. Got: ' + consent + ',' + t
    );
  }

  return !consent
    ? 0
    : typeof consent === 'number' && consent < CURRENT_CONSENT_VERSION
    ? consent
    : typeof consent === 'number'
    ? CURRENT_CONSENT_VERSION
    : 1;
};

/**
 *  Sets the consent with the given key to the consent version
 *  and sets a corresponding timestamp to now.
 *
 *  @param version — The version to set.  Defaults to the current version
 *  @returns The timestamp for when the consent was accepted.
 */
export const grantConsent = async (version = CURRENT_CONSENT_VERSION) => {
  const acceptedAt = new Date().getTime();
  await setItem({
    [CONSENT]: version,
    [CONSENT_ACCEPTED_AT]: acceptedAt
  });
  return acceptedAt;
};

/**
 *  Sets the consent with the given key to the consent version
 *  and sets a corresponding timestamp to now.
 *
 *  @returns The timestamp for when the consent was viewed.
 */
export const viewedConsent = async () => {
  const viewedAt = new Date().getTime();
  await setItem({ [CONSENT_VIEWED_AT]: viewedAt });
  return viewedAt;
};
