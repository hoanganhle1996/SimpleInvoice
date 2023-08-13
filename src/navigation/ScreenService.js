import RouteKey from './RouteKey'
import {LoginScreen} from '../screens'
// Screen Import
import HomeScreen from '../screens/HomeComponent/HomeScreen'
import CreateInvoiceScreen from '../screens/CreateInvoiceComponent/CreateInvoiceScreen'

export const screenMatch = screen => {
  switch (screen) {
    // Screen Match
    case RouteKey.LoginScreen:
      return LoginScreen
    case RouteKey.HomeScreen:
      return HomeScreen
    case RouteKey.CreateInvoiceScreen:
      return CreateInvoiceScreen
    default:
      return ''
  }
}

export const optionsMatch = screen => {
  switch (screen) {
    // Screen Options
    case RouteKey.LoginScreen:
      return {
        header: () => null,
      }
    case RouteKey.HomeScreen:
    case RouteKey.HomeStack:
      return {
        headerLeft: null,
      }
    default:
      return {}
  }
}
