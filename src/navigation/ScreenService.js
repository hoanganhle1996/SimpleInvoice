import RouteKey from './RouteKey'
import {LoginScreen} from '../screens'
// Screen Import
import DetailScreen from '../screens/DetailComponent/DetailScreen'
import HomeScreen from '../screens/HomeComponent/HomeScreen'
import CreateInvoiceScreen from '../screens/CreateInvoiceComponent/CreateInvoiceScreen'
import {Text, StyleSheet} from 'react-native'
import {responsiveHeight, responsiveWidth} from '../themes/metrics'

export const screenMatch = screen => {
  switch (screen) {
    // Screen Match
    case RouteKey.DetailScreen:
      return DetailScreen
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
    case RouteKey.DetailScreen:
    case RouteKey.HomeScreen:
      return {
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 0,
          alignItems: 'left',
          justifyContent: 'left',
        },
        headerTitleStyle: {
          color: 'red',
        },
        headerTitle: () => null,
        headerLeft: () => <Text style={styles.title}>Jobs</Text>,
      }
    case RouteKey.HomeStack:
      return {
        headerLeft: null,
      }
    default:
      return {}
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveHeight(30),
    marginLeft: responsiveWidth(15),
    fontWeight: '600',
  },
})
