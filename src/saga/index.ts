import { all, fork } from 'redux-saga/effects';

import {
  commonSagaRequests,
} from './common/index';

function* rootSaga() {
  yield all([
    fork(commonSagaRequests)
  ]);
}

export { rootSaga };
