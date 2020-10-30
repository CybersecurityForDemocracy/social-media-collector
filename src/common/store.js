import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import appSaga from 'common/state/app/saga';

import navigation from 'common/state/navigation/reducer';
import navigationSaga from 'common/state/navigation/saga';

import consent from 'common/state/consent/reducer';
import consentSaga from 'common/state/consent/saga';
import consentChangeListener from 'common/state/consent/changeListener';

import preference from 'common/state/preference/reducer';
import preferenceSaga from 'common/state/preference/saga';
import preferenceChangeListener from 'common/state/preference/changeListener';

import permission from 'common/state/permission/reducer';
import permissionSaga from 'common/state/permission/saga';
import permissionChangeListener from 'common/state/permission/changeListener';

import archive from 'common/state/archive/reducer';
import archiveSaga from 'common/state/archive/saga';
import archiveChangeListener from 'common/state/archive/changeListener';

const sagaMiddleware = createSagaMiddleware();

/* istanbul ignore next */
function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(navigationSaga),
    fork(consentSaga),
    fork(preferenceSaga),
    fork(permissionSaga),
    fork(archiveSaga)
  ]);
}

const reducer = combineReducers({
  navigation,
  consent,
  preference,
  permission,
  archive
});

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'VIEWED_CONSENT_FAILED',
          'SAVE_CONSENT',
          'SAVE_CONSENT_SUCCESS',
          'NAVIGATE',
          'NAVIGATE_SUCCESS',
          'NAVIGATE_FAILED',
          'SAVE_CONSENT_FAILED'
        ]
      }
    }), // using sagas not thunks
    sagaMiddleware
  ],
  devTools: true
});

[
  consentChangeListener,
  preferenceChangeListener,
  permissionChangeListener,
  archiveChangeListener
].forEach(fn => {
  fn(store);
});

sagaMiddleware.run(rootSaga);

export default store;
