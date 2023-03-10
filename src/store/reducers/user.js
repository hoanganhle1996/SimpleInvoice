import {createSlice} from '@reduxjs/toolkit'
import {USER_CONSTANTS_ACTIONS} from '../constants/user'

export const userInitialState = {
  userInfo: {},
  isEndUser: false,
  tokenData: {},
  contentFlagged: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.FAILURE]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.FAILURE]: () => {},
    userLogin: () => {},
    userSignUp: () => {},
    userLoginSuccess: (state, action) => {},
    logout(state) {},
    updateUserInfo(state, action) {},
  },
  extraReducers: builder => {},
})

export const userActions = {
  ...userSlice.actions,
  userLoginHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.HANDLER],
  userLoginSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.SUCCESS],
  userLoginFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.FAILURE],
  updateUserInfoHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.HANDLER],
  updateUserInfoSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.SUCCESS],
  updateUserInfoFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.FAILURE],
}

export default userSlice.reducer
