import { CURRENT_CONSENT_VERSION } from 'common/storage/consent';

export const INITIAL_STATE = {
  loading: false,
  saving: false,
  granted: null,
  error: null,
  version: NaN,
  acceptedAt: NaN,
  viewedAt: NaN
};

const setGranted = version =>
  version === 0 || isNaN(version)
    ? 'none'
    : version === CURRENT_CONSENT_VERSION
    ? 'current'
    : 'old';

const loadConsent = state => ({
  ...state,
  loading: true
});

const loadConsentSuccess = (state, { version = NaN, acceptedAt = NaN, viewedAt = NaN }) => ({
  ...state,
  loading: false,
  error: null,
  version,
  granted: setGranted(version),
  acceptedAt,
  viewedAt
});

const loadConsentFailed = (state, error) => ({
  ...state,
  loading: false,
  error
});

const saveConsent = state => ({
  ...state,
  saving: true
});

const saveConsentSuccess = (state, { acceptedAt }) => ({
  ...state,
  saving: false,
  error: null,
  version: CURRENT_CONSENT_VERSION,
  granted: 'current',
  acceptedAt
});

const saveConsentFailed = (state, error) => ({
  ...state,
  saving: false,
  error
});

const viewedConsent = state => ({
  ...state,
  saving: true
});

const viewedConsentSuccess = (state, { viewedAt }) => ({
  ...state,
  saving: false,
  error: null,
  viewedAt
});

const viewedConsentFailed = (state, error) => ({
  ...state,
  saving: false,
  error
});

const consentChanged = (state, { version, acceptedAt, viewedAt }) => {
  const newState = { ...state };
  if (!isNaN(version)) newState.version = version;
  if (!isNaN(acceptedAt)) newState.acceptedAt = acceptedAt;
  if (!isNaN(viewedAt)) newState.viewedAt = viewedAt;
  newState.granted = setGranted(newState.version);

  return newState;
};

const responses = {
  LOAD_CONSENT: loadConsent,
  LOAD_CONSENT_SUCCESS: loadConsentSuccess,
  LOAD_CONSENT_FAILED: loadConsentFailed,
  SAVE_CONSENT: saveConsent,
  SAVE_CONSENT_SUCCESS: saveConsentSuccess,
  SAVE_CONSENT_FAILED: saveConsentFailed,
  VIEWED_CONSENT: viewedConsent,
  VIEWED_CONSENT_SUCCESS: viewedConsentSuccess,
  VIEWED_CONSENT_FAILED: viewedConsentFailed,
  CONSENT_CHANGED: consentChanged
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  if (typeof responses[type] === 'function') return responses[type](state, payload);
  return state;
};

export default reducer;
