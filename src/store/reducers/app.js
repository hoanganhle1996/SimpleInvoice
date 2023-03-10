import {createSlice} from '@reduxjs/toolkit'
import RouteKey from '../../navigation/RouteKey'
import {APP_CONSTANTS_ACTIONS} from '../constants/app'

export const appInitialState = {
  showGlobalIndicator: false,
  appState: RouteKey.SplashScreen,
  showSearchBar: false,
  invoiceData: {},
  isFromCreateScreen: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.HANDLER]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.SUCCESS]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.FAILURE]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.HANDLER]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.SUCCESS]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.FAILURE]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.HANDLER]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.SUCCESS]: (state, action) => {
      state.invoiceData = action.payload
    },
    [APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.FAILURE]: (state, action) => {},

    getSettings: (state, action) => {},
    setAppStack: (state, action) => {
      state.appState = action.payload
    },
    getSettingsSuccess: (state, action) => {},
    setShowGlobalIndicator: (state, action) => {
      state.showGlobalIndicator = action.payload
    },
    setIsFromCreateScreen: (state, action) => {
      state.isFromCreateScreen = action.payload
    },
  },
})

export const appActions = {
  ...appSlice.actions,
  setSettingAppHandle: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.HANDLER],
  setSettingAppSuccess: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.SUCCESS],
  setSettingAppFailure: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.FAILURE],
  loginHandle: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.HANDLER],
  loginSuccess: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.SUCCESS],
  loginFailure: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.FAILURE],
  getInvoiceListHandle: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.HANDLER],
  getInvoiceListSuccess: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.SUCCESS],
  getInvoiceListFailure: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_LIST_INVOICE.FAILURE],
}

export default appSlice.reducer
