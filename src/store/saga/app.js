import {takeLatest, call, put} from 'redux-saga/effects'
import {appActions} from '../reducers'
import RouteKey from '../../navigation/RouteKey'
import {getString} from '../../services/mmkv/storage'
import {TOKEN_KEY} from '../../constants'
import {getInvoiceList} from '../../services/api/api'

function* getAppSettingSaga() {
  try {
    const token = yield call(getString, TOKEN_KEY)
    if (!token) {
      throw new Error('Token does not existed!')
    }
  } catch (e) {
    yield put(appActions.setAppStack(RouteKey.MainStack))
  } finally {
  }
}

function* getInvoiceListSaga(action) {
  try {
    const res = yield getInvoiceList(action.payload)
    if (res?.data?.length > 0) {
      yield put(appActions.getInvoiceListSuccess(res))
    }
  } catch (e) {
    yield put(appActions.getInvoiceListFailure(e))
  } finally {
  }
}

export default [
  takeLatest(appActions.getSettings.type, getAppSettingSaga),
  takeLatest(appActions.getInvoiceListHandle, getInvoiceListSaga),
]
