import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  checkConsent,
  grantConsent,
  viewedConsent,
  getConsentAcceptedAt,
  getConsentViewedAt
} from 'common/storage/consent';
import actions from './actions';

export function* load() {
  try {
    const [version, acceptedAt, viewedAt] = yield all([
      call(checkConsent),
      call(getConsentAcceptedAt),
      call(getConsentViewedAt)
    ]);
    yield put(actions.loadConsentSuccess(version, acceptedAt, viewedAt));
  } catch (err) {
    yield put(actions.loadConsentFailed(err));
  }
}

export function* save() {
  try {
    const acceptedAt = yield call(grantConsent);
    yield put(actions.saveConsentSuccess(acceptedAt));
  } catch (err) {
    yield put(actions.saveConsentFailed(err));
  }
}

export function* viewed() {
  try {
    const viewedAt = yield call(viewedConsent);
    yield put(actions.viewedConsentSuccess(viewedAt));
  } catch (err) {
    yield put(actions.viewedConsentFailed(err));
  }
}

/* istanbul ignore next - see https://github.com/antoinejaussoin/redux-saga-testing#how-can-i-test-a-saga-that-uses-take-or-takeevery */
function* saga() {
  yield all([
    takeLatest('LOAD_CONSENT', load),
    takeLatest('SAVE_CONSENT', save),
    takeLatest('VIEWED_CONSENT', viewed)
  ]);
}

export default saga;
