import React from 'react'
import {ActivityIndicator, Dimensions, StyleSheet, View, Text} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {colors, responsiveHeight, responsiveWidth} from '../../../themes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const PADDING_WIDTH = 20
const BUTTON_WIDTH = Dimensions.get('screen').width - PADDING_WIDTH * 2
const SWIPE_RANGE = BUTTON_WIDTH - 64

const SwipeButton = ({onSwipe = () => null, isLoading = false}) => {
  const translateX = useSharedValue(0)

  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      const newValue = e.translationX

      if (newValue >= 0 && newValue <= SWIPE_RANGE) {
        translateX.value = newValue
      }
    },
    onEnd: () => {
      if (translateX.value < SWIPE_RANGE - 50) {
        translateX.value = withSpring(0)
      } else {
        runOnJS(onSwipe)()
      }
    },
  })

  const AnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(translateX.value, [0, BUTTON_WIDTH], [0, BUTTON_WIDTH], Extrapolation.CLAMP),
      },
    ],
  }))

  return (
    <View style={styles.swipeButtonContainer}>
      <PanGestureHandler enabled={!isLoading} onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeButton, AnimatedStyles]}>
          {isLoading ? (
            <ActivityIndicator color={colors.darkGray} />
          ) : (
            <MaterialCommunityIcons name={'gesture-swipe-horizontal'} size={40} />
          )}
        </Animated.View>
      </PanGestureHandler>
      <Text style={styles.swipeText}>Completed</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  swipeButtonContainer: {
    height: responsiveHeight(60),
    backgroundColor: colors.lightBlue,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: BUTTON_WIDTH,
  },
  swipeButton: {
    position: 'absolute',
    left: 5,
    width: responsiveWidth(52),
    aspectRatio: 1,
    borderRadius: 60,
    zIndex: 3,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeButtonDisabled: {
    backgroundColor: '#E4E9EE',
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    zIndex: 2,
    color: colors.black,
  },
})

export default SwipeButton
