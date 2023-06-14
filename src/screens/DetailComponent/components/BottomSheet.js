import React, {useMemo, useCallback, useRef, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {colors, deviceHeight, responsiveHeight, responsiveWidth} from '../../../themes'
import {goBack} from '../../../navigation/NavigationService'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Circle from '../../../components/Circle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SwipeButton from './SwipeButton'
import Feather from 'react-native-vector-icons/Feather'

import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'

const ICON_LOCATION_POSTION_HEIGHT = deviceHeight() / 2

function BottomSheetComponent({onSwipe, loading, handleLoading, onPressLocation}) {
  // ref
  const bottomSheetRef = useRef(null)
  const [viewChange, setChangeView] = useState(null)
  const animatedPosition = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    if (animatedPosition.value < 120) {
      runOnJS(setChangeView)(true)
    } else {
      runOnJS(setChangeView)(false)
    }
    return {
      transform: [
        {
          translateY: withSpring(
            animatedPosition.value < ICON_LOCATION_POSTION_HEIGHT
              ? ICON_LOCATION_POSTION_HEIGHT
              : animatedPosition.value,
            {
              damping: 150,
              stiffness: 400,
            },
          ),
        },
      ],
    }
  })

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

  // callbacks
  const handleSheetChanges = useCallback(index => {
    // TODO
  }, [])

  const onPressGoBack = useCallback(() => {
    goBack()
  }, [])

  const CustomHandle = useCallback(
    () =>
      viewChange ? (
        <View style={styles.headerCloseToTop}>
          <View style={styles.headerContentSection}>
            <MaterialIcons style={styles.backArrow} name={'arrow-back-ios'} size={20} />
            <Text style={styles.serialTitleText}>LY-4b3dec</Text>
            {loading ? <ActivityIndicator color={colors.westSide} /> : <View />}
          </View>
          <View style={styles.moneyHeaderSection}>
            <FontAwesome name={'dollar'} color={colors.black} size={28} />
            <Text style={styles.moneyTextLarge}>65.00</Text>
            <Feather style={styles.refreshIcon} name="refresh-ccw" size={22} color={colors.lightBlue} />
          </View>
        </View>
      ) : (
        <View style={styles.handleView}>
          <View style={styles.handleLeftSection}>
            <Text style={styles.number}>12</Text>
            <View style={styles.timeSection}>
              <Text style={styles.monthsText}>December</Text>
              <Text style={styles.serialText}>N95899</Text>
            </View>
          </View>
          <View style={styles.moneySection}>
            <FontAwesome name={'dollar'} color={colors.white} size={22} />
            <Text style={styles.money}>65.00</Text>
          </View>
        </View>
      ),
    [viewChange, loading],
  )

  return (
    <>
      <TouchableOpacity onPress={onPressGoBack} activeOpacity={0.7} style={styles.backArrowView}>
        <MaterialIcons style={styles.backArrow} name={'arrow-back-ios'} size={20} />
      </TouchableOpacity>
      <Animated.View style={[animatedStyle, {alignItems: 'flex-end'}]}>
        <TouchableOpacity onPress={onPressLocation} activeOpacity={0.7} style={styles.locationIcon}>
          <MaterialIcons name={'my-location'} size={30} />
        </TouchableOpacity>
      </Animated.View>
      <BottomSheet
        handleHeight={0}
        ref={bottomSheetRef}
        index={1}
        handleComponent={CustomHandle}
        snapPoints={snapPoints}
        enableContentPanningGesture
        enableHandlePanningGesture
        animatedPosition={animatedPosition}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <View style={styles.standardSection}>
            <Circle
              style={{backgroundColor: colors.lightBlue}}
              children={<MaterialIcons name={'verified-user'} size={35} color={colors.white} />}
            />
            <Text style={styles.standardText}>Standard ride</Text>
          </View>
          <View style={styles.descriptionSection}>
            <View style={styles.row}>
              <View>
                <MaterialCommunityIcons name={'human-male'} size={25} color={colors.lightBlue} />
                <View style={styles.line} />
                <Circle style={styles.circle} />
              </View>
              <View style={styles.contentLocation}>
                <Text style={styles.descriptionTitle}>
                  Expo Hall 7{'\n'}
                  <Text style={styles.subDescriptionTitle}>Expo Hall 7, Singapore</Text>
                  {'\n'}
                  <Text style={styles.pickupText}>Picked up</Text>
                </Text>
                <Text style={styles.timeText}> 6:06pm</Text>
                <Text style={[styles.descriptionTitle, {marginTop: responsiveHeight(15)}]}>
                  Far East Plaza
                </Text>
                <Text style={styles.subDescriptionTitle}>
                  14, Scotts Road, Orchard, Singapore, Sigapore, 228213
                </Text>
                <Text style={styles.pickupText}>Dropped - off</Text>
              </View>
            </View>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.subDescriptionTitle}>Job Date</Text>
            <Text style={styles.dateText}>12/12/2023</Text>
          </View>
          <View style={styles.swipeButton}>
            <SwipeButton
              isLoading={loading}
              onSwipe={() => {
                handleLoading()
                setTimeout(() => {
                  onSwipe()
                }, 1000)
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  backArrowView: {
    width: responsiveWidth(40),
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(50),
    marginLeft: responsiveWidth(5),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
  },
  handleView: {
    padding: 20,
    backgroundColor: colors.primaryBackground,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  timeSection: {
    marginLeft: responsiveWidth(15),
  },
  monthsText: {
    color: colors.white,
    fontSize: 20,
  },
  serialText: {
    color: colors.grayText,
    marginTop: responsiveHeight(5),
  },
  handleLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  money: {
    fontSize: 25,
    color: colors.white,
  },
  standardSection: {
    flexDirection: 'row',
  },
  standardText: {
    marginLeft: responsiveWidth(20),
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '700',
    color: colors.lightBlue,
  },
  descriptionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.black,
    marginLeft: responsiveWidth(3),
  },
  subDescriptionTitle: {
    fontSize: 18,
    color: colors.grayText,
    fontWeight: '300',
    lineHeight: responsiveHeight(25),
  },
  descriptionSection: {
    marginTop: responsiveHeight(20),
    marginLeft: responsiveWidth(15),
  },
  line: {
    width: responsiveWidth(2.5),
    height: responsiveHeight(130),
    backgroundColor: colors.lightBlue,
    marginLeft: responsiveWidth(10),
    marginVertical: responsiveHeight(8),
  },
  circle: {
    width: responsiveWidth(18),
    aspectRatio: 1,
    borderRadius: 60,
    backgroundColor: colors.lightBlue,
    marginLeft: responsiveWidth(3),
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
  row: {
    flexDirection: 'row',
  },
  location: {
    marginLeft: responsiveWidth(12),
    color: colors.grayText,
  },
  pickupText: {
    fontWeight: '600',
    color: colors.shamrock,
    fontSize: 20,
    lineHeight: responsiveHeight(25),
  },
  contentLocation: {
    marginLeft: responsiveWidth(20),
  },
  timeText: {
    color: colors.lightBlue,
    marginTop: responsiveHeight(90),
    fontSize: 15,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(10),
    marginTop: responsiveHeight(30),
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },
  swipeButton: {
    marginTop: responsiveHeight(30),
  },
  headerCloseToTop: {
    height: responsiveHeight(160),
    marginTop: responsiveHeight(-85),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
  },
  serialTitleText: {
    fontSize: 20,
    fontWeight: '600',
  },
  moneyTextLarge: {
    fontSize: 30,
  },
  headerContentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(40),
  },
  moneyHeaderSection: {
    flexDirection: 'row',
    marginTop: responsiveHeight(30),
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIcon: {
    marginLeft: responsiveWidth(20),
  },
  locationIcon: {
    width: responsiveWidth(45),
    aspectRatio: 1,
    borderRadius: 80,
    marginTop: responsiveHeight(-160),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginRight: responsiveWidth(20),
  },
})

export default React.memo(BottomSheetComponent)
