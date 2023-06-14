import React, {useCallback, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {responsiveHeight, colors, responsiveWidth} from '../../themes'
import RouteKey from '../../navigation/RouteKey'
import HeaderTab from '../../components/HeaderTab'
import {ARRAY_BUTTON} from '../../constants/index'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {navigate} from '../../navigation/NavigationService'
import Circle from '../../components/Circle'
import LinearGradient from 'react-native-linear-gradient'

const HomeScreen = () => {
  const [numbPress, setNumbPress] = useState(0)

  const onPressTab = useCallback(index => {
    setNumbPress(index)
  }, [])

  return (
    <SafeAreaView style={styles.wrapperStyle}>
      <Text style={styles.headerText}>Jobs</Text>
      <LinearGradient
        colors={['transparent', 'transparent', '#ffffff', '#ffffff', '#ffffff', '#7F7F7F']}
        locations={[0, 0.35, 0.35, 0.65, 0.65]}
        style={styles.linearGradient}>
        <ScreenContainer style={styles.container}>
          <View style={styles.headerTab}>
            {ARRAY_BUTTON.map((el, index) => {
              const isSelected = numbPress === index
              return (
                <View style={styles.headerItem}>
                  <HeaderTab
                    onPress={() => {
                      onPressTab(index)
                    }}
                    title={el}
                    style={[
                      styles.headerTabItem,
                      {backgroundColor: isSelected ? colors.primaryBackground : colors.gallery},
                    ]}
                    styleText={{
                      color: isSelected ? colors.white : colors.grayText,
                      fontWeight: isSelected ? '600' : '300',
                    }}
                  />
                </View>
              )
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate(RouteKey.DetailScreen)
            }}
            activeOpacity={0.8}
            style={styles.card}>
            <View style={styles.cardUpperSection}>
              <Text style={styles.titleText}>Expo Hall 7</Text>
              <View>
                <View style={styles.rightUpperSection}>
                  <FontAwesome name={'dollar'} color={colors.white} size={15} />
                  <Text style={styles.moneyText}>65.00</Text>
                </View>
                <View style={[styles.rightUpperSection, {marginTop: responsiveHeight(5)}]}>
                  <EvilIcons name={'clock'} color={colors.white} size={15} />
                  <Text style={styles.timeText}>in 7 months</Text>
                </View>
              </View>
            </View>
            <View style={styles.descriptionSection}>
              <View>
                <MaterialCommunityIcons name={'human-male'} size={25} color={colors.lightBlue} />
                <View style={styles.line} />
                <Circle style={styles.circleDestination} />
              </View>
              <View>
                <Text style={[styles.descriptionTitle]}>
                  Expo Hall 7 <Text style={styles.subDescriptionTitle}>- Expo Hall 7, Singapore </Text>
                </Text>
                <Text style={[styles.descriptionTitle, {marginTop: responsiveHeight(50)}]}>
                  Far East Plaza{' '}
                  <Text style={styles.subDescriptionTitle}>
                    - 14, Scotts Road, Orchard, Singapore, Singapore, 228213
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Circle
            style={styles.lightning}
            children={<MaterialCommunityIcons name="lightning-bolt" size={35} color={colors.crusta} />}
          />
        </ScreenContainer>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    padding: 15,
    backgroundColor: 'transparent',
  },
  headerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(10),
  },
  headerItem: {
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: colors.primaryBackground,
    borderRadius: responsiveHeight(5),
    marginTop: responsiveHeight(30),
    padding: 20,
  },
  headerTabItem: {
    width: '90%',
  },
  rightUpperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
  },
  moneyText: {
    fontSize: 20,
    color: colors.white,
  },
  timeText: {
    fontSize: 15,
    color: colors.grayText,
    fontWeight: '500',
    marginLeft: responsiveWidth(5),
  },
  cardUpperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginLeft: responsiveWidth(3),
  },
  subDescriptionTitle: {
    fontSize: 18,
    color: colors.silver,
    fontWeight: '300',
  },
  descriptionSection: {
    marginTop: responsiveHeight(20),
    flexDirection: 'row',
  },
  line: {
    width: responsiveWidth(3),
    height: responsiveHeight(35),
    backgroundColor: colors.lightBlue,
    marginLeft: responsiveWidth(10),
    marginVertical: responsiveHeight(8),
  },
  circle: {
    width: responsiveWidth(18),
    aspectRatio: 1,
    borderRadius: 60,
    backgroundColor: colors.lightBlue,
    marginLeft: responsiveWidth(2),
  },
  header: {
    width: '100%',
    height: responsiveHeight(100),
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    paddingHorizontal: responsiveWidth(15),
  },
  headerText: {
    fontSize: responsiveHeight(30),
    fontWeight: '600',
    paddingHorizontal: responsiveWidth(15),
  },
  lightning: {
    position: 'absolute',
    aspectRatio: 1,
    backgroundColor: colors.white,
    bottom: 30,
    left: 20,
  },
  circleDestination: {
    backgroundColor: colors.lightBlue,
    width: responsiveWidth(18),
    aspectRatio: 1,
    marginLeft: responsiveWidth(3),
  },
})

export default HomeScreen
