import React, {useMemo, useCallback, useRef} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import ColorInterpolation from './TextAnimation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {colors, responsiveHeight, responsiveWidth} from '../../../themes'
import {goBack} from '../../../navigation/NavigationService'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Circle from '../../../components/Circle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function BottomSheetComponent({value, onChangeText, placeholder, style, ...rest}) {
  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], [])

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])

  const onPress = useCallback(() => {
    goBack()
  }, [])

  const CustomHandle = useCallback(
    () => (
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
    [],
  )

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.backArrowView}>
        <MaterialIcons style={styles.backArrow} name={'arrow-back-ios'} size={20} />
      </TouchableOpacity>
      <BottomSheet
        handleHeight={0}
        ref={bottomSheetRef}
        index={1}
        handleComponent={CustomHandle}
        snapPoints={snapPoints}
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
              </View>
            </View>
            {/* <View style={styles.row}>
              <MaterialCommunityIcons name={'human-male'} size={25} color={colors.blue} />
              <Text style={styles.descriptionTitle}>Expo Hall 7</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.line} />
              <Text style={styles.location}>
                Expo Hall 7, Singapore
                {'\n'}
                <Text style={styles.subDescriptionTitle}>Picked up</Text>
              </Text>
            </View>

            <View style={styles.row}>
              <Circle style={styles.circle} />
              <Text
                style={[
                  styles.descriptionTitle,
                  {marginLeft: responsiveWidth(5), marginTop: responsiveHeight(-2)},
                ]}>
                6:06pm
              </Text>
            </View> */}
          </View>
        </View>
      </BottomSheet>
    </View>
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
    marginTop: responsiveHeight(25),
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
    fontWeight: '500',
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
    color: colors.silver,
    fontWeight: '300',
    lineHeight: responsiveHeight(25),
  },
  descriptionSection: {
    marginTop: responsiveHeight(20),
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
})

export default React.memo(BottomSheetComponent)
