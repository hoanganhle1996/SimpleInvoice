import {takeLatest, delay, put} from 'redux-saga/effects'
import {appActions, userActions} from '../reducers'
import RouteKey from '../../navigation/RouteKey'
import Toast from '../../components/Toast'
import {login, getUserProfile} from '../../services/api/api'
import {setHeader} from '../../services/networking/axios'
import {setObject} from '../../services/mmkv/storage'
import {USER_INFO_KEY, HEADER_AUTHENTICATION, ORG_TOKEN} from '../../constants'

function* userLoginSaga(action) {
  try {
    console.log('action', action)
    yield put(appActions.setShowGlobalIndicator(true))
    const body = action?.payload?.data ?? {}
    const res = yield login(body)
    if (res?.access_token) {
      setHeader(HEADER_AUTHENTICATION, `Bearer ${res.access_token}`)
      yield put(userActions.userLoginSuccess(res))
      yield delay(1000)
      yield put(appActions.setAppStack(RouteKey.MainStack))
    }
  } catch (e) {
    Toast.error(e.message)
    yield put(appActions.setAppStack(RouteKey.AuthStack))
  } finally {
    yield put(appActions.setShowGlobalIndicator(false))
  }
}

function* updateUserInfo(action) {
  try {
    const {onSuccess} = action?.payload
    const res = yield getUserProfile()
    if (res?.data?.userId) {
      onSuccess && onSuccess()
      const token = res?.data?.memberships?.[0].token
      setHeader(ORG_TOKEN, token)
      setObject(USER_INFO_KEY, res.data)
    }
  } catch (e) {
    Toast.error(e.message)
  }
}

export default [
  takeLatest(userActions.userLogin.type, userLoginSaga),
  takeLatest(userActions.updateUserInfo.type, updateUserInfo),
]
