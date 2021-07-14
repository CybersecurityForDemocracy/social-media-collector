import getInstallationId from '../utils/getInstallationId';
import parseFbObservation from 'content/facebook/utils/ad/post2020/parseFbObservation';
import { getPreference } from 'common/storage/preference';
import { checkPermission } from 'common/storage/permission';
import { checkConsent } from 'common/storage/consent';

import {
  PREF_COUNTRY,
  PREF_LANGUAGE,
  PREF_GENDER,
  PREF_AGE,
  USER_SHARE_INSTALLATION_ID,
  USER_SHARE_COUNTRY,
  USER_SHARE_LANGUAGE,
  USER_SHARE_GENDER,
  USER_SHARE_AGE
} from 'common/keys';
import { EXTENSION_VERSION } from 'common/constants';

const extensionProviderId = process.env.PROVIDER_ID;

/**
 *  Constuct a payload object to send to the server.
 *
 *  @param posts — The array of of posts.
 *  @returns an boject with the posts, installationId, and countryCode.
 */
const makePayload = async items => {
  const [
    installationId,
    countryCode,
    languageCode,
    genderCode,
    ageCode,
    consentVersion
  ] = await Promise.all([
    getInstallationId(),
    getPreference(PREF_COUNTRY),
    getPreference(PREF_LANGUAGE),
    getPreference(PREF_GENDER),
    getPreference(PREF_AGE),
    checkConsent()
  ]);

  const [shareIid, shareCc, shareLc, shareGc, shareAc] = await Promise.all([
    checkPermission(USER_SHARE_INSTALLATION_ID),
    checkPermission(USER_SHARE_COUNTRY),
    checkPermission(USER_SHARE_LANGUAGE),
    checkPermission(USER_SHARE_GENDER),
    checkPermission(USER_SHARE_AGE)
  ]);

  const metadata = {
    extensionProviderId,
    consentVersion,
    extensionVersion: EXTENSION_VERSION
  };
  if (shareIid) metadata.installationId = installationId;
  if (shareCc) metadata.countryCode = countryCode;
  if (shareLc) metadata.languageCode = languageCode;
  if (shareGc) metadata.genderCode = genderCode;
  if (shareAc) metadata.ageCode = ageCode;

  // Add payload of objects that was originally done in python.
  const parsedFbObservations = parseFbObservation({ metadata, items });

  return { metadata, items, parsedFbObservations };
};

export default makePayload;
